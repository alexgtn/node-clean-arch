export default class UsersHandler {
    userUsecase

    constructor(usecase) {
        this.userUsecase = usecase;
    }

    async getUsers(req, res, usecase) {
        const tasks = await usecase.getUsers();
        res.json(tasks);
    }

    async addUser(req, res, usecase) {
        const user = req.body;
        const addedUser = await usecase.addUser(user);
        res.json(addedUser);
    }

    registerRoutes(app, routerFactory) {
        const subRouter = routerFactory.Router();

        const getUsersHandler = (req, res) => this.getUsers(req, res, this.userUsecase);
        subRouter.get('/', getUsersHandler);

        const addUserHandler = (req, res) => this.addUser(req, res, this.userUsecase);
        subRouter.post('/', addUserHandler);

        app.use("/users", subRouter);
    }
}
