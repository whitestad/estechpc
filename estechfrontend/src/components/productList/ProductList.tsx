import React from 'react';
import { Grid, Card, CardContent, CardMedia, Typography, Rating, Box } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import theme from '@styles/theme';

export interface Product {
    id: number;
    name: string;
    short_characteristics: string;
    description: string;
    price: number;
    photos: string[];
    average_rating: number | null;
    count_of_reviews: number;
    count_of_orders: number;
}

export interface ProductListProps {
    products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
    return (
        <Grid container spacing={2}>
            {products.map((product) => (
                <Grid item xs={12} sm={6} md={4} xl={3} key={product.id}>
                    <Card
                        sx={{
                            borderRadius: 1,
                            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.12)',
                            overflow: 'hidden',
                            transition: 'transform 0.3s, box-shadow 0.3s',
                            '&:hover': {
                                transform: 'scale(1.02)',
                                boxShadow: '0 6px 30px rgba(0, 0, 0, 0.15)',
                            },
                        }}
                    >
                        <CardMedia
                            component='img'
                            height='250'
                            image={product.photos[0] || 'https://via.placeholder.com/250'}
                            alt={product.name}
                            sx={{ objectFit: 'cover' }}
                        />
                        <CardContent sx={{ textAlign: 'left' }}>
                            <Typography
                                variant='h6'
                                sx={{
                                    fontWeight: 'bold',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                }}
                            >
                                {product.name}
                            </Typography>
                            <Typography variant='body2' sx={{ color: 'text.secondary', mb: 1 }}>
                                {product.short_characteristics || 'Краткие характетиристики не указаны'}
                            </Typography>
                            <Typography variant='h6' sx={{ color: 'primary.main', mb: 1 }}>
                                {product.price.toLocaleString('ru-RU')} ₽
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                <Rating
                                    value={product.average_rating || 0}
                                    precision={0.1}
                                    readOnly
                                    size='small'
                                    icon={<StarIcon fontSize='inherit' sx={{ color: 'primary.main' }} />}
                                    emptyIcon={<StarIcon fontSize='inherit' sx={{ color: 'text.primary', opacity: 0.5 }} />}
                                />
                                <Typography variant='body2' sx={{ ml: 1, color: 'text.secondary' }}>
                                    {product.average_rating ? product.average_rating.toFixed(1) : 0} ({product.count_of_reviews || 0} отзывов)
                                </Typography>
                            </Box>
                            <Typography variant='body2' sx={{ color: 'text.secondary' }}>
                                Заказы: {product.count_of_orders}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default ProductList;
