// src/components/RegisterPage.tsx
import React, { useState } from "react";
import { Alert, Box, Button, CircularProgress, TextField, Typography } from "@mui/material";
import useAuthStore from "@stores/authStore";
import { useNavigate } from "react-router-dom";

const RegisterPage: React.FC = () => {
    const register = useAuthStore((state) => state.register);
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async () => {
        event.preventDefault();
        setLoading(true);
        setError(null);

        if (password !== confirmPassword) {
            setError('Пароли не совпадают.');
            setLoading(false);
            return;
        }

        try {
            const { error } = await register(username, password, confirmPassword);
            console.log(error)
            if (error) {
                let errors: string = '';

                for (const key in error) {
                    for (const item of error[key]) {
                        errors += item + '\n';
                    }
                }

                setError(errors || 'Произошла ошибка при регистрации.');
            } else {
                navigate('/');
            }
        } catch (err) {
            setError(err.message || 'Произошла ошибка при регистрации.');
        }

        setLoading(false);


    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, margin: "0 auto", padding: 4 }}>
            <Typography variant="h4" gutterBottom>
                Регистрация
            </Typography>
            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}
            <TextField
                label="Имя пользователя"
                type="text"
                fullWidth
                margin="normal"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            <TextField
                label="Пароль"
                type="password"
                fullWidth
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required/>
            <TextField
                label="Подтвердите пароль"
                type="password"
                fullWidth
                margin="normal"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
            />
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }} disabled={loading}>
                {loading ? <CircularProgress size={24} /> : 'Зарегистрироваться'}
            </Button>
        </Box>
    );
};

export default RegisterPage;
