import React from 'react';
import { Paper, Typography, Button, List, ListItem, ListItemText, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import theme from '@styles/theme';
import { ICartItem as CartItemType } from 'types/cart';

interface CartSummaryProps {
    selectedItems: CartItemType[];
    totalAmount: number;
    isCheckoutDisabled: boolean;
}

const CartSummaryComponent: React.FC<CartSummaryProps> = ({ selectedItems, totalAmount, isCheckoutDisabled }) => {
    const navigate = useNavigate();

    return (
        <Paper
            sx={{
                width: '100%',
                height: 'max-content',
                padding: theme.spacing(3),
                borderRadius: 2,
                boxShadow: `0px 4px 10px rgba(0, 0, 0, 0.1)`,
                mb: { xs: 4, sm: 0 }, // Отступ снизу на мобильных
            }}
            elevation={0}
        >
            <Button
                variant='contained'
                color='primary'
                onClick={() => navigate('/checkout')}
                sx={{
                    textTransform: 'none',
                    fontWeight: 'bold',
                    padding: theme.spacing(1.5, 5),
                    borderRadius: 2,
                    width: '100%',
                    mb: 2, // Отступ снизу
                }}
                disabled={isCheckoutDisabled}
            >
                Перейти к оформлению
            </Button>
            <Typography variant='h5' sx={{ mb: 2, textAlign: 'right', fontWeight: 'bold' }}>
                Сумма: {totalAmount.toLocaleString('ru-RU')} ₽
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant='h6' sx={{ mb: 2 }}>
                Ваша корзина
            </Typography>
            <List disablePadding>
                {selectedItems.map((item) => (
                    <ListItem key={item.id} disableGutters>
                        <ListItemText primary={`${item.product.name}`} secondary={`Количество: ${item.quantity}`} />
                        <Typography variant='body2' sx={{ fontWeight: 'bold' }}>
                            {item.product.price.toLocaleString('ru-RU')} ₽
                        </Typography>
                    </ListItem>
                ))}
            </List>
        </Paper>
    );
};

export default CartSummaryComponent;
