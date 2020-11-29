import fs from "fs"

export default class UsersJSONRepository {
    filePath

    constructor(filePath) {
        this.filePath = filePath
    }

    async getUsers() {
        const usersBuffer = await fs.promises.readFile(this.filePath);
        return JSON.parse(usersBuffer);
    }

    async addUser(user) {
        const usersBuffer = await fs.promises.readFile(this.filePath);
        let users = JSON.parse(usersBuffer);
        users.push(user);
        const updatedUsersBuffer = JSON.stringify(users);
        const resBuffer = await fs.promises.writeFile(this.filePath, updatedUsersBuffer);
        return JSON.parse(resBuffer);
    }
}