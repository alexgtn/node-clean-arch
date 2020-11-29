#!/usr/bin/env node
/**
 * Module dependencies.
 */

import debug from "debug"
import http from "http"
import express from "express"
import path from "path"
import cookieParser from "cookie-parser"
import logger from "morgan"
import UsersUsecase from "../user/usecase/user.js";
import IndexUsecase from "../index/usecase/index.js";
import UsersJSONRepository from "../user/repository/file/user.js";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import UsersHandler from "../user/delivery/http/user.js";
import IndexHandler from "../index/delivery/http/index.js";
import UsersPostgresRepository from "../user/repository/db/user.js";
import pkg from 'pg';
const { Client } = pkg;

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3000');

const dbConfig = {
  database: process.env.PG_DATABASE,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  ssl: {
    rejectUnauthorized: false,
  }
}

const dbClient = new Client(dbConfig)
await dbClient.connect()

const usersRepository = new UsersJSONRepository('./user/repository/file/data/users.json');
// const usersRepository = new UsersPostgresRepository(dbClient);
const usersUsecase = new UsersUsecase(usersRepository);
const indexUsecase = new IndexUsecase();
const usersHandler = new UsersHandler(usersUsecase);
const indexHandler = new IndexHandler(indexUsecase);

const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.static(path.join(__dirname, 'public')));

usersHandler.registerRoutes(app, express);
indexHandler.registerRoutes(app, express);

app.set('port', port);

/**
 * Create HTTP server.js.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server.js "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server.js "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
