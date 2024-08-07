// src/stores/authStore.ts
import create from "zustand";
import apiInstance from "../api/api";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
    username: string;
    email?: string;
}

interface AuthState {
    token: string | null;
    user: { username: string; email?: string } | null;
    login: (username: string, password: string) => Promise<void>;
    register: (username: string, password: string, password2: string) => Promise<void>;
    logout: () => void;
    isAuthenticated: () => boolean;
}

// Функция для загрузки данных из localStorage
const loadFromLocalStorage = (key: string) => {
    try {
        const serializedData = localStorage.getItem(key);
        return serializedData ? JSON.parse(serializedData) : null;
    } catch (error) {
        console.error("Ошибка загрузки данных из localStorage:", error);
        return null;
    }
};

// Функция для сохранения данных в localStorage
const saveToLocalStorage = (key: string, value: any) => {
    try {
        const serializedData = JSON.stringify(value);
        localStorage.setItem(key, serializedData);
    } catch (error) {
        console.error("Ошибка сохранения данных в localStorage:", error);
    }
};

const useAuthStore = create<AuthState>((set, get) => ({
    token: localStorage.getItem("token"),
    user: loadFromLocalStorage("user"),

    login: async (username, password) => {
        try {
            const response = await apiInstance.post("users/token/", { username, password });
            const { access } = response.data;
            set({ token: access });
            localStorage.setItem("token", access);

            // Декодируем токен и извлекаем данные пользователя
            const decoded: DecodedToken = jwtDecode(access);
            const user = { username: decoded.username, email: decoded.email };
            set({ user });
            saveToLocalStorage("user", user); // Сохраняем пользователя в localStorage
        } catch (error) {
            console.error("Ошибка авторизации:", error);
        }
    },

    register: async (username, password, password2) => {
        try {
            const response = await apiInstance.post("users/register/", {
                username,
                email: "", // Добавьте email, если он обязателен
                password,
                password2,
            });
            console.log("Регистрация успешна:", response.data);
            const { access } = response.data;
            set({ token: access });
            localStorage.setItem("token", access);

            // Декодируем токен и извлекаем данные пользователя
            const decoded: DecodedToken = jwtDecode(access);
            const user = { username: decoded.username, email: decoded.email };
            set({ user });
            saveToLocalStorage("user", user); // Сохраняем пользователя в localStorage
        } catch (error: any) {
            if (error.response) {
                console.error("Ошибка регистрации:", error.response.data);
            } else {
                console.error("Ошибка:", error.message);
            }
        }
    },

    logout: () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        set({ token: null, user: null });
    },

    // Функция проверки авторизации
    isAuthenticated: () => {
        const { token } = get();
        return Boolean(token);
    },
}));

export default useAuthStore;
