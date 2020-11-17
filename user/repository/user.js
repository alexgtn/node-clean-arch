import fs from "fs"

export default class UsersJSONRepository {
    fsPromises
    filePath

    constructor(filePath) {
        this.fsPromises = fs.promises;
        this.filePath = filePath
    }

    async getUsers() {
        const usersBuffer = await this.fsPromises.readFile(this.filePath);
        const usersString = usersBuffer.toString();
        return JSON.parse(usersString);
    }
}