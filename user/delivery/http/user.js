export default class UsersHandler {
    userUsecase

    constructor(usecase) {
        this.userUsecase = usecase;
    }

    async getUsers(req, res, usecase) {
        const tasks = await usecase.getUsers();
        res.json(tasks);
    }

    registerRoutes(app, router) {
        const subRouter = router.Router();

        const getUsersHandler = (req, res) => this.getUsers(req, res, this.userUsecase);
        subRouter.get('/', getUsersHandler);

        app.use("/users", subRouter);
    }
}
