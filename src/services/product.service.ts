import { IProductDocument, ProductDao } from "../dao/product.dao";
import { IDao } from "../interfaces/common.interface";
import { IProduct } from "../interfaces/product.interface";
import { MapperUtil } from "../utils/mapper.util";

export class ProductService implements IDao<IProduct> {

    private static instance: ProductService;
    private dao: ProductDao;

    constructor() {
        this.dao = ProductDao.getInstance();
    }

    public static getInstance(): ProductService {
        if (!ProductService.instance) {
            ProductService.instance = new ProductService();
        }
        return ProductService.instance;
    }

    public async getAll(): Promise<IProduct[]> {
        const data: IProductDocument[] = await this.dao.getAll();
        return data.map(doc => MapperUtil.mapSchemaDocumentToDTO<IProduct>(doc));
    }

    public async getById(id: string): Promise<IProduct | null> {
        const data: IProductDocument | null = await this.dao.getById(id);
        if (data) {
            return MapperUtil.mapSchemaDocumentToDTO<IProduct>(data);
        }
        return null;
    }

    public async create(payload: Omit<IProduct, "id">): Promise<IProduct> {
        const createdProduct = await this.dao.create(payload);
        return MapperUtil.mapSchemaDocumentToDTO<IProduct>(createdProduct);
    }

    public async update(id: string, payload: Partial<Omit<IProduct, "id">>): Promise<IProduct | null> {
        const updatedProduct = await this.dao.update(id, payload);
        if (updatedProduct) {
            return MapperUtil.mapSchemaDocumentToDTO<IProduct>(updatedProduct);
        }
        return null;
    }

    public async delete(id: string): Promise<boolean> {
        return this.dao.delete(id);
    }

}
