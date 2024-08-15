import { IProduct } from './products';

export interface ICartItem {
    id: number;
    product: IProduct;
    quantity: number;
}

export interface ICart {
    id: number;
    items: ICartItem[];
    total_amount: number;
}
