// src/stores/authStore.ts
import create from 'zustand';
import apiInstance from '@api/api';
import { jwtDecode } from 'jwt-decode';
import { AxiosError } from 'axios';

interface DecodedToken {
    username: string;
    email?: string;
}

interface AuthState {
    token: string | null;
    user: { username: string; email?: string } | null;
    login: (username: string, password: string) => Promise<{ data: any; error: string | object | null }>;
    register: (username: string, password: string, password2: string) => Promise<{ data: any; error: string | object | null }>;
    logout: () => void;
    isAuthenticated: () => boolean;
}

// Функция для загрузки данных из localStorage
const loadFromLocalStorage = (key: string) => {
    try {
        const serializedData = localStorage.getItem(key);
        return serializedData ? JSON.parse(serializedData) : null;
    } catch (error) {
        console.error('Ошибка загрузки данных из localStorage:', error);
        return null;
    }
};

// Функция для сохранения данных в localStorage
const saveToLocalStorage = (key: string, value: any) => {
    try {
        const serializedData = JSON.stringify(value);
        localStorage.setItem(key, serializedData);
    } catch (error) {
        console.error('Ошибка сохранения данных в localStorage:', error);
    }
};

const useAuthStore = create<AuthState>((set, get) => ({
    token: localStorage.getItem('token'),
    user: loadFromLocalStorage('user'),

    login: async (username, password) => {
        try {
            const response = await apiInstance.post('users/token/', { username, password });
            const { access } = response.data;
            set({ token: access });
            localStorage.setItem('token', access);

            // Декодируем токен и извлекаем данные пользователя
            const decoded: DecodedToken = jwtDecode(access);
            const user = { username: decoded.username, email: decoded.email };
            set({ user });
            saveToLocalStorage('user', user); // Сохраняем пользователя в localStorage

            return { data: response.data, error: null };
        } catch (error) {
            console.log(error);
            if (error instanceof AxiosError && error.response) {
                return { data: null, error: error.response.data };
            } else {
                return { data: null, error: error.message };
            }
        }
    },

    register: async (username, password, password2) => {
        try {
            const response = await apiInstance.post('users/register/', {
                username,
                email: '',
                password,
                password2,
            });

            const { access } = response.data;
            set({ token: access });
            localStorage.setItem('token', access);

            // Декодируем токен и извлекаем данные пользователя
            const decoded: DecodedToken = jwtDecode(access);
            const user = { username: decoded.username, email: decoded.email };
            set({ user });

            saveToLocalStorage('user', user); // Сохраняем пользователя в localStorage

            return { data: response.data, error: null };
        } catch (error) {
            console.error(error);
            if (error instanceof AxiosError && error.response) {
                console.log(error)
                return { data: null, error: error.response.data };
            } else {
                return { data: null, error: error.message };
            }
        }
    },

    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        set({ token: null, user: null });
    },

    // Функция проверки авторизации
    isAuthenticated: () => {
        const { token } = get();
        return Boolean(token);
    },
}));

export default useAuthStore;
