// src/api/api.ts
import axios from "axios";

export const baseURL = "http://localhost:8000/api/";

// Создаем instance для запросов
const apiInstance = axios.create({
    baseURL,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
    withCredentials: true, // Включает отправку cookies, если они необходимы для аутентификации
});

// Перехватчик для добавления токена авторизации
apiInstance.interceptors.request.use(
    (config) => {
        // Не добавляем токен, если это запрос регистрации
        if (!config.url.includes("register")) {
            const token = localStorage.getItem("token");
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default apiInstance;
