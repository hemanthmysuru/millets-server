import mongoose, { Document, Model, Schema } from 'mongoose';
import { IProduct } from "../interfaces/product.interface";
import { IDao } from "../interfaces/common.interface";

export interface IProductDocument extends IProduct, Document { }

const ProductSchema: Schema = new Schema(
    {
        // id: { type: String, require: true },
        name: { type: String, require: true },
        description: { type: String, require: true },
        price: { type: String, require: true },
        discount: { type: String, require: true },
        currency: { type: String, require: true },
        category: { type: String, require: true },
        totalStockInInvetory: { type: String, require: true },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
    }
)

const SchemaModel: Model<IProductDocument> = mongoose.model<IProductDocument>('Product', ProductSchema);

export class ProductDao implements IDao<IProductDocument> {

    private static instance: ProductDao;

    constructor() { }

    public static getInstance(): ProductDao {
        if (!this.instance) {
            this.instance = new ProductDao();
        }
        return this.instance;
    }

    public async getAll(): Promise<IProductDocument[]> {
        return SchemaModel.find({}).exec();
    }

    public async getById(id: string): Promise<IProductDocument | null> {
        return SchemaModel.findById(id).exec();
    }

    public async create(payload: Omit<IProduct, "id">): Promise<IProductDocument> {
        const data = new SchemaModel(payload);
        return data.save();
    }

    public async update(id: string, payload: Partial<Omit<IProductDocument, "id">>): Promise<IProductDocument | null> {
        return SchemaModel.findByIdAndUpdate(id, payload, { new: true }).exec();
    }

    public async delete(id: string): Promise<boolean> {
        const result = await SchemaModel.findByIdAndDelete(id).exec();
        return result !== null;
    }

}