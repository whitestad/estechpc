// src/types/order.ts

import { IProduct } from 'types/products';

export interface IOrder {
    id: number;

    address: string;
    contact_method: string;
    contact_method_display: string;
    contact_info: string;

    delivery_method: string;
    delivery_method_display: string;

    status: string;
    status_display: string;

    items: IOrderItem[];

    created_at: string;
    updated_at: string;
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
