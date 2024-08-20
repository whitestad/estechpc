// src/api/user.ts

import { IUserProfile } from 'types/user';
import { createAuthAxiosInstance } from '@api/authAxios';

const authAxios = createAuthAxiosInstance();

// Функция для получения профиля пользователя
export const fetchUserProfile = async (): Promise<IUserProfile> => {
    const response = await authAxios.get('/users/profile/');
    return response.data;
};

// Функция для обновления профиля пользователя
export const updateUserProfile = async (profileData: Partial<IUserProfile>): Promise<IUserProfile> => {
    console.log(profileData);
    const response = await authAxios.put('/users/profile/', profileData);
    return response.data;
};

// Функция для обновления аватара пользователя
export const updateUserAvatar = async (avatarFile: File): Promise<IUserProfile> => {
    const formData = new FormData();
    formData.append('avatar', avatarFile);

    const response = await authAxios.put('/users/profile/avatar/', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};
