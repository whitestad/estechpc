import React from 'react';
import { Avatar, ListItem, ListItemText, Typography } from '@mui/material';
import { IOrderItem } from 'types/order';
import { DEFAULT_PRODUCT_IMAGE } from '@utils/constans';

interface OrderItemProps {
    item: IOrderItem;
}

const OrderItem: React.FC<OrderItemProps> = ({ item }) => {
    return (
        <ListItem sx={{ p: 0, mb: 2 }}>
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
    );
};

export default OrderItem;
