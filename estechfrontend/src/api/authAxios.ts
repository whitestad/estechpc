// src/api/authAxios.ts

import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { getRefreshToken, isAccessTokenExpired, setAuthUser } from './auth';
import { API_BASE_URL } from './constants';
import Cookies from 'js-cookie';

export const createAuthAxiosInstance = (): AxiosInstance => {
    const axiosInstance: AxiosInstance = axios.create({
        baseURL: API_BASE_URL,
        timeout: 5000,
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
    });

    axiosInstance.interceptors.request.use(async (req: InternalAxiosRequestConfig<any>) => {
        const accessToken = Cookies.get('access_token') || '';
        const refreshToken = Cookies.get('refresh_token') || '';

        // Проверка истечения срока действия токена
        if (!isAccessTokenExpired(accessToken)) {
            req.headers.Authorization = `Bearer ${accessToken}`;
            return req;
        }

        // Обновление токена
        const response = await getRefreshToken(refreshToken);
        setAuthUser(response.access, response.refresh);

        if (req.headers) {
            req.headers.Authorization = `Bearer ${response.access}`;
        }
        return req;
    });

    return axiosInstance;
};
