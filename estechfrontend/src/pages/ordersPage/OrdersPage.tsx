import React, { useState } from 'react';
import { Box, Container, Typography, List } from '@mui/material';
import { useOrders } from 'src/hooks/useOrders';
import OrderCard from './OrderCard';

const OrdersPage: React.FC = () => {
    const { orders, isLoading, isError } = useOrders();
    const [expandedOrderId, setExpandedOrderId] = useState<number | null>(null);

    const handleToggle = (orderId: number) => {
        setExpandedOrderId((prevOrderId) => (prevOrderId === orderId ? null : orderId));
    };

    if (isLoading) {
        return (
            <Box display='flex' justifyContent='center' alignItems='center' height='100vh'>
                <Typography variant='h6'>Загрузка заказов...</Typography>
            </Box>
        );
    }

    if (isError) {
        return (
            <Container>
                <Typography variant='h6' color='error' align='center' gutterBottom>
                    Произошла ошибка при загрузке заказов.
                </Typography>
            </Container>
        );
    }

    return (
        <Container sx={{ py: 4 }}>
            <Typography variant='h4' gutterBottom>
                Мои заказы
            </Typography>
            <List>
                {orders.map((order) => (
                    <OrderCard key={order.id} order={order} isExpanded={expandedOrderId === order.id} onToggle={() => handleToggle(order.id)} />
                ))}
            </List>
        </Container>
    );
};

export default OrdersPage;
