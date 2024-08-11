// src/types/Product.ts

export interface IProductPhoto {
    photo: string;
}

export interface Products {
    id: number;
    name: string;
    short_characteristics: string;
    description: string;
    price: number;
    photos: IProductPhoto[];
    average_rating: number | null;
    count_of_reviews: number;
    count_of_orders: number;
}

export interface IAttribute {
    name: string;
    value: string;
}

export interface IProductDetail {
    id: number;
    name: string;
    short_characteristics: string;
    description: string;
    price: number;
    photos: IProductPhoto[];
    average_rating: number | null;
    count: number;
    count_of_reviews: number;
    count_of_orders: number;
    reviews: unknown[];
    attributes: IAttribute[];
}
