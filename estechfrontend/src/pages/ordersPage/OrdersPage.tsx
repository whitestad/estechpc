import React, { useState } from 'react';
import {
    Box,
    Button,
    Container,
    Typography,
    List,
    ListItem,
    ListItemText,
    Avatar,
    Card,
    CardContent,
    Collapse,
    IconButton,
    Grid,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { useOrders } from 'src/hooks/useOrders';
import { DEFAULT_PRODUCT_IMAGE } from '@utils/constans';

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
                {orders.map((order) => {
                    const totalPrice = order.items.reduce((total, item) => total + item.total_price, 0);
                    return (
                        <Card key={order.id} elevation={0} sx={{ mb: 3 }}>
                            <CardContent>
                                <Grid container justifyContent='space-between' alignItems='center'>
                                    <Grid item>
                                        <Typography variant='h6'>
                                            Заказ №{order.id} от {new Date(order.created_at).toLocaleDateString()}
                                        </Typography>
                                        <Typography variant='body2' color='textSecondary'>
                                            Статус: <strong>{order.status_display}</strong> | Общая сумма: <strong>{totalPrice} ₽</strong>
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <IconButton onClick={() => handleToggle(order.id)}>
                                            {expandedOrderId === order.id ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                        </IconButton>
                                    </Grid>
                                </Grid>
                                <Collapse in={expandedOrderId === order.id} timeout='auto' unmountOnExit>
                                    <List sx={{ mt: 2 }}>
                                        {order.items.map((item) => (
                                            <ListItem key={item.id} sx={{ p: 0, mb: 2 }}>
                                                <Avatar
                                                    variant='rounded'
                                                    src={(item.product.photos[0] && item.product.photos[0].photo) || DEFAULT_PRODUCT_IMAGE}
                                                    alt={item.product.name}
                                                    sx={{ width: 80, height: 80, mr: 2, borderRadius: 2 }}
                                                />
                                                <ListItemText
                                                    primary={item.product.name}
                                                    secondary={
                                                        <>
                                                            <Typography variant='body2' color='textSecondary'>
                                                                {item.product.short_characteristics}
                                                            </Typography>
                                                            <Typography variant='body2'>
                                                                Количество: {item.quantity} | Цена: {item.price} ₽
                                                            </Typography>
                                                        </>
                                                    }
                                                />
                                            </ListItem>
                                        ))}
                                    </List>
                                    <Box display='flex' justifyContent='flex-end' mt={2}>
                                        <Typography variant='h6'>Итого: {totalPrice} ₽</Typography>
                                    </Box>
                                    <Box display='flex' justifyContent='flex-end' mt={2}>
                                        <Button variant='contained' color='primary'>
                                            Повторить заказ
                                        </Button>
                                    </Box>
                                </Collapse>
                            </CardContent>
                        </Card>
                    );
                })}
            </List>
        </Container>
    );
};

export default OrdersPage;
