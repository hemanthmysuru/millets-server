import { Request, Response } from "express";
import { IControllerHandlers, ICustomError } from "../interfaces/common.interface";
import { ProductModel } from "../models/product.model";
import { IProduct } from "../interfaces/product.interface";
import { ProductService } from "../services/product.service";
import { LoggerService } from "../services/logger.service";

const model = new ProductModel();

export class ProductController implements IControllerHandlers {

    private productService: ProductService;
    private logger: LoggerService;

    constructor() {
        this.productService = ProductService.getInstance();
        this.logger = LoggerService.getInstance();
    }

    public async getAll(req: Request, res: Response): Promise<void> {
        try {
            this.logger.info("ProductController::getAll");
            const dataList = await this.productService.getAll();
            res.status(200).json(dataList);
        } catch (err) {
            const error = err as ICustomError;
            res.status(500).json({ message: error?.message });
            this.logger.error(error.message);
        }
    }

    public async getById(req: Request, res: Response): Promise<void> {
        try {
            this.logger.info("ProductController::getById::id::" + req.params.id);
            const data = await this.productService.getById(req.params.id);
            if (data) {
                res.status(200).json(data);
            } else {
                res.status(404).json({ message: "Record not found" });
            }
        } catch (err) {
            const error = err as ICustomError;
            res.status(500).json({ message: error?.message });
            this.logger.error(error.message);
        }
    }

    public async create(req: Request, res: Response): Promise<void> {
        const productData: Omit<IProduct, '_id'> = req.body;
        try {
            this.logger.info("ProductController::create::payload::" + productData);
            const newData = await this.productService.create(productData);
            res.status(201).json(newData);
        } catch (err) {
            const error = err as ICustomError;
            res.status(400).json({ message: error?.message });
            this.logger.error(error.message);
        }
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const dataToUpdate: Partial<Omit<IProduct, '_id'>> = req.body;
        try {
            this.logger.info("ProductController::update::payload" + dataToUpdate + "::id::" + id);
            const updatedData = await this.productService.update(id, dataToUpdate);
            if (updatedData) {
                res.status(200).json(updatedData);
            } else {
                res.status(404).json({ message: "Failed to create" });
            }
        } catch (err) {
            const error = err as ICustomError;
            res.status(400).json({ message: error?.message });
            this.logger.error(error.message);
        }
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            this.logger.info("ProductController::delete::id::" + req.params.id);
            const success = await this.productService.delete(id);
            if (success) {
                res.status(200).json({ message: "Record deleted successfully" });
            } else {
                res.status(404).json({ message: "Record not found" });
            }
        } catch (err) {
            const error = err as ICustomError;
            res.status(500).json({ message: error?.message });
            this.logger.error(error.message);
        }
    }

    // public getAll(req: Request, res: Response): void {
    //     try {
    //         const dataList = model.getAll();
    //         res.status(200).json(dataList);
    //     } catch (err) {
    //         const error = err as ICustomError;
    //         res.status(500).json({ message: error?.message });
    //     }
    // }

    // public getById(req: Request, res: Response): void {
    //     try {
    //         const data = model.getById(req.params.id);
    //         if (data) {
    //             res.status(200).json(data);
    //         } else {
    //             res.status(404).json({ message: "Record not found" });
    //         }
    //     } catch (err) {
    //         const error = err as ICustomError;
    //         res.status(500).json({ message: error?.message });
    //     }
    // }

    // public create(req: Request, res: Response): void {
    //     try {
    //         const newData = model.create(req.body);
    //         res.status(201).json(newData);
    //     } catch (err) {
    //         const error = err as ICustomError;
    //         res.status(400).json({ message: error?.message });
    //     }
    // }

    // public update(req: Request, res: Response): void {
    //     try {
    //         const updatedData = model.update(req.params.id, req.body);
    //         if (updatedData) {
    //             res.status(200).json(updatedData);
    //         } else {
    //             res.status(404).json({ message: "Failed to create" });
    //         }
    //     } catch (err) {
    //         const error = err as ICustomError;
    //         res.status(400).json({ message: error?.message });
    //     }
    // }

    // public delete(req: Request, res: Response): void {
    //     try {
    //         const success = model.delete(req.params.id);
    //         if (success) {
    //             res.status(200).json({ message: "Record deleted successfully" });
    //         } else {
    //             res.status(404).json({ message: "Record not found" });
    //         }
    //     } catch (err) {
    //         const error = err as ICustomError;
    //         res.status(500).json({ message: error?.message });
    //     }
    // }

}