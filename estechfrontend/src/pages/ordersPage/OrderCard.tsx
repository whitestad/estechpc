import React from 'react';
import { Card, CardContent, Collapse, Grid, Typography, Box, Button, List, IconButton, Avatar } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { IOrder } from 'src/types/order';
import OrderItem from './OrderItem';
import { DEFAULT_PRODUCT_IMAGE } from '@utils/constans';

interface OrderCardProps {
    order: IOrder;
    isExpanded: boolean;
    onToggle: () => void;
}

const OrderCard: React.FC<OrderCardProps> = ({ order, isExpanded, onToggle }) => {
    const totalPrice = order.items.reduce((total, item) => total + item.total_price, 0);

    return (
        <Card elevation={0} sx={{ mb: 3 }} onClick={onToggle}>
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
                        <Button variant='text' endIcon={isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}>
                            {isExpanded ? 'Скрыть детали' : 'Подробнее'}
                        </Button>
                    </Grid>
                </Grid>

                {!isExpanded && (
                    <Grid container spacing={1} sx={{ mt: 2 }}>
                        {order.items.slice(0, 3).map((item) => (
                            <Grid item key={item.id}>
                                <Avatar
                                    variant='rounded'
                                    src={(item.product.photos[0] && item.product.photos[0].photo) || DEFAULT_PRODUCT_IMAGE}
                                    alt={item.product.name}
                                    sx={{ width: 48, height: 48, borderRadius: 2 }}
                                />
                            </Grid>
                        ))}
                    </Grid>
                )}

                <Collapse in={isExpanded} timeout='auto' unmountOnExit>
                    <List sx={{ mt: 2 }}>
                        {order.items.map((item) => (
                            <OrderItem key={item.id} item={item} />
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
};

export default OrderCard;
