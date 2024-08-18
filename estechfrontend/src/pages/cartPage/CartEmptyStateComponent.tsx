import React from 'react';
import { Paper, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import theme from '@styles/theme';

const CartEmptyStateComponent: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Paper
            elevation={0}
            sx={{
                padding: theme.spacing(6),
                textAlign: 'center',
                borderRadius: 2,
                boxShadow: `0px 4px 10px rgba(0, 0, 0, 0.1)`,
            }}
        >
            <Typography variant='h6' sx={{ mb: 2 }}>
                Ваша корзина пуста.
            </Typography>
            <Button
                variant='contained'
                color='primary'
                sx={{ padding: theme.spacing(1, 4), fontWeight: 'bold' }}
                onClick={() => navigate('/products')}
            >
                Перейти к покупкам
            </Button>
        </Paper>
    );
};

export default CartEmptyStateComponent;
