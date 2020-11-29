export default class IndexHandler {
    indexUsecase

    constructor(usecase) {
        this.indexUsecase = usecase;
    }

    async getIndexPage(req, res, usecase) {
        const indexPageHTML = await usecase.getIndexPage();
        res.send(indexPageHTML);
    }

    registerRoutes(app, routerFactory) {
        const subRouter = routerFactory.Router();

        const getIndexPageHandler = (req, res) => this.getIndexPage(req, res, this.indexUsecase)
        subRouter.get('/', getIndexPageHandler);

        app.use("/", subRouter);
    }
}
