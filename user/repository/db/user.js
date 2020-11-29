
export default class UsersPostgresRepository {
    dbClient
    tableName = "users"

    constructor(dbClient) {
        this.dbClient = dbClient;
    }

    async getUsers() {
        const queryRes = await this.dbClient.query(`select id, firstname, lastname, avatar from ${this.tableName}`);
        return queryRes.rows;
    }

    async addUser(user) {
        const queryRes = await this.dbClient.query(`
            insert into ${this.tableName} (firstname, lastname, avatar)
            values($1, $2, $3) 
            returning id
        `, [user.firstname, user.lastname, user.avatar]);
        user.id = queryRes.rows[0].id;
        return user;
    }
}