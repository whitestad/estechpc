// src/components/LoginPage.tsx
import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import useAuthStore from "@stores/authStore";

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const login = useAuthStore((state) => state.login);

    const handleLogin = async () => {
        await login(email, password);
    };

    return (
        <Box sx={{ maxWidth: 400, margin: "0 auto", padding: 4 }}>
            <Typography variant="h4" gutterBottom>
                Вход
            </Typography>
            <TextField label="Email" type="email" fullWidth margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} />
            <TextField label="Пароль" type="password" fullWidth margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} />
            <Button variant="contained" color="primary" onClick={handleLogin} fullWidth sx={{ mt: 2 }}>
                Войти
            </Button>
        </Box>
    );
};

export default LoginPage;
