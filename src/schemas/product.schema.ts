import mongoose, { Model, Schema } from "mongoose";
import { IProduct } from "../interfaces/product.interface";

interface IProductDocument extends IProduct, Document { }

const ProductSchema: Schema = new Schema({
    id: { type: String, require: true },
    name: { type: String, require: true },
    description: { type: String, require: true },
    price: { type: String, require: true },
    discount: { type: String, require: true },
    currency: { type: String, require: true },
    category: { type: String, require: true },
    totalStockInInvetory: { type: String, require: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
})

const ProductModel: Model<IProductDocument> = mongoose.model<IProductDocument>('Product', ProductSchema);