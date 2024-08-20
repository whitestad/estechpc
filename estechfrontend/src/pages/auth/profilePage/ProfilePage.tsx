// src/pages/ProfilePage.tsx
import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, Avatar, CircularProgress, Alert } from '@mui/material';
import { useUser } from '@hooks/useUser';

const ProfilePage: React.FC = () => {
    const { user, updateUser, error, isUpdating } = useUser();
    const [formData, setFormData] = useState({
        username: '',
        first_name: '',
        last_name: '',
        phone_number: '',
    });

    useEffect(() => {
        if (user) {
            setFormData({
                username: user.username,
                first_name: user.first_name || '',
                last_name: user.last_name || '',
                phone_number: user.phone_number || '',
            });
        }
    }, [user]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        await updateUser(formData);
    };

    if (isUpdating) {
        return <CircularProgress />;
    }

    return (
        <Box component='form' onSubmit={handleSubmit} sx={{ maxWidth: 400, margin: 'auto', mt: 5, p: 2 }}>
            <Typography variant='h5' component='h1' gutterBottom>
                Профиль
            </Typography>

            {error && (
                <Alert severity='error' sx={{ mb: 2 }}>
                    {error.response.data.username.join('\n')}
                </Alert>
            )}

            <Avatar src={user?.avatar || formData.username} sx={{ width: 56, height: 56, mb: 2 }} />
            <TextField
                margin='normal'
                required
                fullWidth
                id='username'
                label='Username'
                name='username'
                autoComplete='username'
                value={formData.username}
                onChange={handleChange}
            />
            <TextField
                margin='normal'
                fullWidth
                id='firstName'
                label='First Name'
                name='first_name'
                autoComplete='given-name'
                value={formData.first_name}
                onChange={handleChange}
            />
            <TextField
                margin='normal'
                fullWidth
                id='lastName'
                label='Last Name'
                name='last_name'
                autoComplete='family-name'
                value={formData.last_name}
                onChange={handleChange}
            />
            <TextField
                margin='normal'
                fullWidth
                id='phoneNumber'
                label='Phone Number'
                name='phone_number'
                autoComplete='tel'
                value={formData.phone_number}
                onChange={handleChange}
            />
            <Button type='submit' variant='contained' color='primary' fullWidth sx={{ mt: 2 }} disabled={isUpdating}>
                {isUpdating ? <CircularProgress size={24} /> : 'Сохранить'}
            </Button>
        </Box>
    );
};

export default ProfilePage;
