import axios, { AxiosInstance } from 'axios';
import { API_BASE_URL } from './constants';

const apiInstance: AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 5000, // тайм-аут 5 секунд
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

export default apiInstance;
