import React from 'react';
import { Paper, Typography, Button, Container, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import theme from '@styles/theme';

import box from '@assets/images/free-icon-box-685391.png';

const CartEmptyStateComponent: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Container maxWidth='md' sx={{ py: 4 }}>
            <Paper
                elevation={0}
                sx={{
                    padding: theme.spacing(6),
                    textAlign: 'center',
                    borderRadius: 2,
                    boxShadow: `0px 4px 10px rgba(0, 0, 0, 0.1)`,

                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography variant='h6' sx={{ mb: 2 }}>
                    Ваша корзина пуста
                </Typography>

                <Box component='img' src={box} sx={{ width: '100px' }} py={4} />

                <Button variant='text' color='primary' sx={{ padding: theme.spacing(1, 4), fontWeight: 'bold' }} onClick={() => navigate('/catalog')}>
                    Перейти к покупкам
                </Button>
            </Paper>
        </Container>
    );
};

export default CartEmptyStateComponent;
