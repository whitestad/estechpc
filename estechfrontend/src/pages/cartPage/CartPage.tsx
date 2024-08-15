// src/pages/CartPage.tsx

import React from 'react';
import { Container, Typography, Box, Button, CircularProgress } from '@mui/material';
import { useCart } from '@hooks/useCart';
import ErrorText from '@components/errorText/ErrorText';
import CartItem from '@components/CartItem';

const CartPage: React.FC = () => {
    const { cart, isLoadingCart, isErrorCart, clearCart, isClearing } = useCart();

    if (isLoadingCart) {
        return (
            <Box display='flex' justifyContent='center' alignItems='center' height='100vh'>
                <CircularProgress />
            </Box>
        );
    }

    if (isErrorCart || !cart) {
        return <ErrorText>Ошибка загрузки корзины.</ErrorText>;
    }

    return (
        <Container maxWidth='lg' sx={{ py: 4 }}>
            <Typography variant='h4' gutterBottom>
                Ваша корзина
            </Typography>
            {cart.items.length === 0 ? (
                <Typography variant='body1'>Ваша корзина пуста.</Typography>
            ) : (
                <>
                    {cart.items.map((item) => (
                        <CartItem key={item.id} item={item} />
                    ))}
                    <Box mt={4} display='flex' justifyContent='space-between'>
                        <Button variant='contained' color='secondary' onClick={() => clearCart()} disabled={isClearing}>
                            {isClearing ? <CircularProgress size={24} /> : 'Очистить корзину'}
                        </Button>
                        <Typography variant='h5'>Итого: {cart.total_amount} ₽</Typography>
                    </Box>
                </>
            )}
        </Container>
    );
};

export default CartPage;
