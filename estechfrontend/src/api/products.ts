// src/api/products.ts

import apiInstance from '@api/axios';
import { Product } from '@components/productList/ProductList';
import { FiltersResponse } from '@components/filtersPanel/FiltersPanel';

export const fetchProducts = async (
    categoryId: number | null,
    selectedFilters: { [key: string]: string[] },
    priceRange: { min: number; max: number }
): Promise<Product[]> => {
    const params = new URLSearchParams();

    if (categoryId !== null) {
        params.append('c', categoryId.toString());
    }
    if (priceRange.min > 0) {
        params.append('minp', priceRange.min.toString());
    }
    if (priceRange.max > 0) {
        params.append('maxp', priceRange.max.toString());
    }

    // Adding attribute filters
    Object.entries(selectedFilters).forEach(([key, values]) => {
        values.forEach((value) => {
            params.append('attribute', `${key}:${value}`);
        });
    });

    params.append('include_out_of_stock', 'false');

    const response = await apiInstance.get(`/products/list/?${params.toString()}`);
    if (response.data && Array.isArray(response.data.results)) {
        return response.data.results;
    }
    throw new Error('Invalid data format: results should be an array');
};

export const fetchFilters = async (categoryId: number): Promise<FiltersResponse> => {
    const response = await apiInstance.get(`/products/categories/${categoryId}/filters/`);
    if (response.data) {
        return response.data;
    }
    throw new Error('Invalid data format for filters');
};
