// src/pages/ProfilePage.tsx
import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, Avatar, CircularProgress, Alert } from '@mui/material';
import { useUser } from '@hooks/useUser';

interface FormData {
    username: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    avatar: File | string | null;
    avatarPreview: string | null; // Добавлено для предварительного просмотра
}

const ProfilePage: React.FC = () => {
    const { user, updateUser, error, isUpdating } = useUser();
    const [formData, setFormData] = useState<FormData>({
        username: '',
        first_name: '',
        last_name: '',
        phone_number: '',
        avatar: null,
        avatarPreview: null,
    });

    useEffect(() => {
        if (user) {
            setFormData({
                username: user.username,
                first_name: user.first_name || '',
                last_name: user.last_name || '',
                phone_number: user.phone_number || '',
                avatar: user.avatar || null,
                avatarPreview: user.avatar || null,
            });
        }
    }, [user]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        if (file) {
            const fileURL = URL.createObjectURL(file);
            setFormData((prev) => ({ ...prev, avatar: file, avatarPreview: fileURL }));
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const formDataToSend = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            if (value !== null && key !== 'avatarPreview') {
                formDataToSend.append(key, value);
            }
        });

        await updateUser(formDataToSend);
        if (formData.avatarPreview && formData.avatar instanceof File) {
            URL.revokeObjectURL(formData.avatarPreview); // Очищаем временный URL
        }
    };

    return (
        <Box component='form' onSubmit={handleSubmit} sx={{ maxWidth: 500, margin: 'auto', mt: 5, p: 2 }}>
            <Typography variant='h5' gutterBottom>
                Профиль
            </Typography>
            {error && <Alert severity='error'>{error.message}</Alert>}
            <Avatar src={typeof formData.avatarPreview === 'string' ? formData.avatarPreview : undefined} sx={{ width: 90, height: 90, mb: 2 }} />
            <input type='file' onChange={handleAvatarChange} accept='image/*' />
            <TextField name='username' label='Username' fullWidth margin='normal' value={formData.username} onChange={handleChange} />
            <TextField name='first_name' label='First Name' fullWidth margin='normal' value={formData.first_name} onChange={handleChange} />
            <TextField name='last_name' label='Last Name' fullWidth margin='normal' value={formData.last_name} onChange={handleChange} />
            <TextField name='phone_number' label='Phone Number' fullWidth margin='normal' value={formData.phone_number} onChange={handleChange} />
            <Button type='submit' variant='contained' color='primary' fullWidth sx={{ mt: 3 }} disabled={isUpdating}>
                {isUpdating ? <CircularProgress size={24} /> : 'Сохранить изменения'}
            </Button>
        </Box>
    );
};

export default ProfilePage;
