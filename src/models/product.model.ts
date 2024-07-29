import { ICRUD } from "../interfaces/common.interface";
import { IProduct } from "../interfaces/product.interface";

export class ProductModel implements ICRUD<IProduct> {

    private dataList: IProduct[];
    private currentId: number;

    constructor() {
        this.dataList = [];
        this.currentId = 0;
    }

    public getAll(): IProduct[] {
        return this.dataList;
    }

    public getById(id: string): IProduct | undefined {
        // return this.dataList.find((product: IProduct) => product?.id == id);
        return;
    }

    public create(payload: Omit<IProduct, "id">): IProduct {
        const newData = { id: (++this.currentId).toString(), ...payload };
        this.dataList.push(newData);
        return newData;
    }

    public update(id: string, updatedData: Partial<Omit<IProduct, "id">>): IProduct | undefined {
        // const index = this.dataList.findIndex((data: IProduct) => data.id === id);
        // if (index !== -1) {
        //     this.dataList[index] = { ...this.dataList[index], ...updatedData };
        //     return this.dataList[index];
        // }
        return undefined;
    }

    public delete(id: string): boolean {
        // const index = this.dataList.findIndex((data: IProduct) => data.id === id);
        // if (index !== -1) {
        //     this.dataList.splice(index, 1);
        //     return true;
        // }
        return false;
    }

}