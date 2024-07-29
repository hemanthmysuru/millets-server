import { json, urlencoded } from "body-parser";
import express, { Application } from "express";
import homeRoutes from "./routes/home.routes";
import errorMiddleware from "./middlewares/error.middleware";
import productRouter from "./routes/product.routes";
import { dbConnectionService } from "./services/db-connection.service";
import { LoggerService } from "./services/logger.service";

class App {
    public app: Application;
    public port: number;
    private logger: LoggerService;

    constructor(port: number) {
        this.logger = LoggerService.getInstance();
        this.app = express();
        this.port = port;
        this.initMiddlewares();
        this.initRoutes();
        this.initErrorHandlers();
        this.initDataBase();
    }

    private initMiddlewares(): void {
        this.app.use(json());
        this.app.use(urlencoded({ extended: true }));
    }

    private initRoutes(): void {
        this.app.use("/", homeRoutes);
        this.app.use("/product", productRouter);
    }

    private initErrorHandlers(): void {
        this.app.use(errorMiddleware);
    }

    private async initDataBase(): Promise<void> {
        try {
            await dbConnectionService.connect();
        } catch (error) {
            this.logger.error('Failed to connect to the database', { error });
        }
    }

    public async listen() {
        // await dbConnectionService.connect();
        this.app.listen(this.port, () => {
            console.log(`Server is running at http://localhost:${this.port}`);
        });
    }
}

export default App;
