import { IProduct } from 'types/products';

export interface IFavorite {
    id: number;
    product: IProduct;
    created_at: string;
}
