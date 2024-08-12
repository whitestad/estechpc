// src/pages/profilePage/ProfilePage.tsx

import React, { useState } from 'react';
import { Box, Button, CircularProgress, TextField, Typography, Avatar } from '@mui/material';
import { useQuery, useMutation } from '@tanstack/react-query';
import { fetchUserProfile, updateUserProfile, updateUserAvatar } from '@api/user';
import { IUserProfile } from 'types/user';
import LoadingBox from '@components/loadingBox/LoadingBox';
import ErrorText from '@components/errorText/ErrorText';
import { fetchProductById } from "@api/products";

const ProfilePage: React.FC = () => {
    const [profile, setProfile] = useState<IUserProfile | null>(null);
    const [avatarFile, setAvatarFile] = useState<File | null>(null);

    const { data, isLoading, isError } = useQuery({
        queryKey: ['userProfile'],
        queryFn: () => fetchUserProfile(),

        onSuccess: (data) => {
            setProfile(data);
        },
        onError: (error) => {
            console.error('Ошибка загрузки профиля:', error);
        },
    });

    const updateProfileMutation = useMutation({
        mutationFn: updateUserProfile,
        onSuccess: (updatedData) => {
            setProfile(updatedData);
            console.log('Профиль обновлен');
        },
        onError: (error) => {
            console.error('Ошибка при обновлении профиля:', error);
        },
    });

    const updateAvatarMutation = useMutation({
        mutationFn: updateUserAvatar,
        onSuccess: (updatedData) => {
            setProfile(updatedData);
            console.log('Аватар обновлен');
        },
        onError: (error) => {
            console.error('Ошибка при обновлении аватара:', error);
        },
    });

    const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files[0]) {
            setAvatarFile(files[0]);
        }
    };

    const handleAvatarUpdate = () => {
        if (avatarFile) {
            updateAvatarMutation.mutate(avatarFile);
        }
    };

    const handleProfileUpdate = () => {
        if (profile) {
            updateProfileMutation.mutate(profile);
        }
    };

    if (isLoading) {
        return <LoadingBox />;
    }
    console.log(isError, profile);
    if (isError || !profile) {
        return <ErrorText>Ошибка загрузки данных профиля.</ErrorText>;
    }

    return (
        <Box>
            <Typography variant='h4' gutterBottom>Профиль пользователя</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 3 }}>
                <Avatar
                    src={profile.avatar || undefined}
                    sx={{ width: 100, height: 100, mb: 2 }}
                    alt={profile.username}
                />
                <Button variant='outlined' component='label'>
                    Изменить аватар
                    <input hidden accept='image/*' type='file' onChange={handleAvatarChange} />
                </Button>
                <Button onClick={handleAvatarUpdate} disabled={!avatarFile || updateAvatarMutation.isLoading} sx={{ mt: 2 }}>
                    {updateAvatarMutation.isLoading ? <CircularProgress size={24} /> : 'Обновить аватар'}
                </Button>
            </Box>
            <Box component='form' sx={{ mt: 3 }} noValidate autoComplete='off'>
                <TextField
                    label='Логин'
                    value={profile.username}
                    onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                    fullWidth
                    sx={{ mb: 2 }}
                />
                <TextField
                    label='Имя'
                    value={profile.first_name}
                    onChange={(e) => setProfile({ ...profile, first_name: e.target.value })}
                    fullWidth
                    sx={{ mb: 2 }}
                />
                <TextField
                    label='Фамилия'
                    value={profile.last_name}
                    onChange={(e) => setProfile({ ...profile, last_name: e.target.value })}
                    fullWidth
                    sx={{ mb: 2 }}
                />
                <TextField
                    label='Номер телефона'
                    value={profile.phone_number || ''}
                    onChange={(e) => setProfile({ ...profile, phone_number: e.target.value })}
                    fullWidth
                    sx={{ mb: 2 }}
                />
                <Button
                    onClick={handleProfileUpdate}
                    variant='contained'
                    color='primary'
                    disabled={updateProfileMutation.isLoading}
                    sx={{ mt: 3 }}
                >
                    {updateProfileMutation.isLoading ? <CircularProgress size={24} /> : 'Сохранить изменения'}
                </Button>
                <Button variant='text' color='secondary' sx={{ mt: 2 }}>
                    Изменить пароль
                </Button>
            </Box>
        </Box>
    );
};

export default ProfilePage;
