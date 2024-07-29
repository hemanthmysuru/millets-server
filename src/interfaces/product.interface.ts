export interface IProduct {
    // _id?: string;
    name: string;
    description: string;
    price: number;
    discount: number;
    currency: string;
    category: string;
    totalStockInInventory: number;
    createdAt: Date;
    updatedAt: Date;
}