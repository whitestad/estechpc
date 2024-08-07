// src/components/RegisterPage.tsx
import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import useAuthStore from "@stores/authStore";

const RegisterPage: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const register = useAuthStore((state) => state.register);

    const handleRegister = async () => {
        if (password !== confirmPassword) {
            alert("Пароли не совпадают");
            return;
        }
        await register(username, password, confirmPassword);
    };

    return (
        <Box sx={{ maxWidth: 400, margin: "0 auto", padding: 4 }}>
            <Typography variant="h4" gutterBottom>
                Регистрация
            </Typography>
            <TextField
                label="Имя пользователя"
                type="text"
                fullWidth
                margin="normal"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <TextField label="Пароль" type="password" fullWidth margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} />
            <TextField
                label="Подтвердите пароль"
                type="password"
                fullWidth
                margin="normal"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button variant="contained" color="primary" onClick={handleRegister} fullWidth sx={{ mt: 2 }}>
                Зарегистрироваться
            </Button>
        </Box>
    );
};

export default RegisterPage;
