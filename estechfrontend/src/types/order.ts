// src/types/order.ts

import { IProduct } from 'types/products';

export interface IOrder {
    id: number;
    created_at: string;
    updated_at: string;

    status: string;
    status_display: string;

    items: IOrderItem[];
}

export interface IOrderItem {
    id: number;
    product: IProduct;
    quantity: number;
    price: number;
    total_price: number;
}

export interface PaginatedResponse<T> {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[];
}

export interface IOrderCreateData {
    delivery_method: string;
    contact_method: string;
    contact_detail: string;
    items: {
        product: number;
        quantity: number;
    }[];
    total_price: number;
}
