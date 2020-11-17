export default class IndexHandler {
    indexUsecase

    constructor(usecase) {
        this.indexUsecase = usecase;
    }

    async getIndexPage(req, res, usecase) {
        const indexPageHTML = await usecase.getIndexPage();
        res.send(indexPageHTML);
    }

    registerRoutes(app, router) {
        const subRouter = router.Router();
        subRouter.get('/', (req, res) => this.getIndexPage(req, res, this.indexUsecase));
        app.use("/", subRouter);
    }
}
