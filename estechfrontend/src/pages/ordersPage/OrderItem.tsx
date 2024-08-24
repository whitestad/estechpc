import React from 'react';
import { Avatar, Box, Link, ListItem, ListItemText, Typography } from '@mui/material';
import { IOrderItem } from 'types/order';
import { DEFAULT_PRODUCT_IMAGE } from '@utils/constans';
import theme from '@styles/theme';
import { formatPrice } from '@utils/formatPrice';
import { useNavigate } from 'react-router-dom';

interface OrderItemProps {
    item: IOrderItem;
}

const OrderItem: React.FC<OrderItemProps> = ({ item }) => {
    const navigate = useNavigate();

    return (
        <ListItem sx={{ p: 0, mb: 2 }}>
            <Avatar
                variant='rounded'
                src={(item.product.photos[0] && item.product.photos[0].photo) || DEFAULT_PRODUCT_IMAGE}
                alt={item.product.name}
                sx={{ width: 80, height: 80, mr: 2, borderRadius: 2 }}
            />
            <Box sx={{ width: '100%', minHeight: 80, display: 'flex', alignItems: 'start', justifyContent: 'space-between' }}>
                <Box>
                    <Link
                        href={`/products/${item.product.id}`}
                        variant='actayWide'
                        sx={{
                            color: theme.palette.text.primary,
                            textDecoration: 'none',

                            '&:hover': {
                                color: theme.palette.primary.main,
                                textDecoration: 'none',
                            },
                        }}
                    >
                        {item.product.name}
                    </Link>
                    <Typography variant='body2' color='textSecondary'>
                        {item.product.short_characteristics}
                    </Typography>
                </Box>

                <Box>
                    <Typography variant='body1' color='textSecondary' align={'right'}>
                        Цена:{' '}
                        <Typography component={'span'} variant={'actayWide'} color={'text.primary'}>
                            {formatPrice(item.total_price)}
                        </Typography>{' '}
                    </Typography>
                    <Typography variant='body2' color='textSecondary' align={'right'}>
                        {item.quantity}шт. x {formatPrice(item.price)}
                    </Typography>
                </Box>
            </Box>
        </ListItem>
    );
};

export default OrderItem;
