import { Router } from "express";
import { ProductController } from "../controllers/product.controller";

class ProductRoutes {
    public router: Router;
    private controller: ProductController;

    constructor() {
        this.router = Router();
        this.controller = new ProductController();
        this.initRoutes();
    }

    private initRoutes(): void {
        this.router.get('/', this.controller.getAll.bind(this.controller));
        this.router.get('/:id', this.controller.getById.bind(this.controller));
        this.router.post('/', this.controller.create.bind(this.controller));
        this.router.put('/:id', this.controller.update.bind(this.controller));
        this.router.delete('/:id', this.controller.delete.bind(this.controller));
    }
}

const productRouter = new ProductRoutes().router;
export default productRouter;