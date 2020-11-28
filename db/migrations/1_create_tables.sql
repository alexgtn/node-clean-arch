create table if not exists users (
  id SERIAL PRIMARY KEY,
  firstname varchar NOT NULL,
  lastname varchar NOT NULL,
  avatar varchar NOT NULL
);