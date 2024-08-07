// src/components/LoginPage.tsx
import React, { useState } from "react";
import { Alert, Box, Button, CircularProgress, TextField, Typography } from "@mui/material";
import useAuthStore from "@stores/authStore";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
    const login = useAuthStore((state) => state.login);
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async () => {
        event.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const { error } = await login(username, password);
            if (error) {
                if (typeof error === 'string'){
                    setError(error);
                }
                else if (typeof error === 'object'){
                    setError(error.detail);
                }
            } else {
                navigate('/');
            }
        } catch (err) {
            setError('Произошла ошибка при входе.');
        } finally {
            setLoading(false);
        }

    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, margin: "0 auto", padding: 4 }}>
            <Typography variant="h4" gutterBottom>
                Вход
            </Typography>
            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}

            <TextField
                label="Имя пользователя"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                fullWidth
                margin="normal"
                required
            />
            <TextField
                label="Пароль"
                type="password"
                fullWidth margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />

            <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
                disabled={loading}
            >
                {loading ? <CircularProgress size={24} /> : 'Войти'}
            </Button>
        </Box>
    );
};

export default LoginPage;
