// src/api/orders.ts
import { IOrder, IOrderCreateData, PaginatedResponse } from 'types/order';
import { createAuthAxiosInstance } from '@api/authAxios';

const authAxios = createAuthAxiosInstance();

// Получение списка заказов с поддержкой пагинации
export const fetchOrders = async (page: number = 1): Promise<PaginatedResponse<IOrder>> => {
    const response = await authAxios.get(`/orders/list/?page=${page}`);
    return response.data;
};

// Создание нового заказа
export const createOrder = async (orderData: IOrderCreateData): Promise<IOrderCreateData> => {
    const response = await authAxios.post('/orders/list/', orderData);
    return response.data;
};
