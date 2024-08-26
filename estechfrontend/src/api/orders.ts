// src/api/orders.ts
import axios from 'axios';
import { IOrder, IOrderCreateData, PaginatedResponse } from 'types/order';
import { createAuthAxiosInstance } from '@api/authAxios';

const authAxios = createAuthAxiosInstance();

// Получение списка заказов с поддержкой пагинации
export const fetchOrders = async (page: number = 1): Promise<PaginatedResponse<IOrder>> => {
    const response = await authAxios.get(`/orders/list/?page=${page}`);
    console.log(response.data);
    return response.data;
};

// Получение деталей одного заказа
export const fetchOrderDetails = async (orderId: number): Promise<IOrder> => {
    const response = await authAxios.get(`/orders/list/${orderId}/`);
    return response.data;
};

// Создание нового заказа
export const createOrder = async (orderData: IOrderCreateData): Promise<IOrder> => {
    const response = await authAxios.post('/orders/list/', orderData);
    return response.data;
};
