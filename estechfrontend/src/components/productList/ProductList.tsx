import React from 'react';
import { Grid, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { IProduct } from 'types/products';
import { useNavigate } from 'react-router-dom';
import { DEFAULT_PRODUCT_IMAGE } from '@utils/constans';
import CustomRating from '@components/rating/CustomRating';

export interface ProductListProps {
    products: IProduct[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
    const navigate = useNavigate();
    return (
        <Grid container spacing={2}>
            {products.map((product) => (
                <Grid item xs={12} sm={6} md={4} xl={3} key={product.id}>
                    <Card
                        onClick={() => navigate(`/products/${product.id}`)}
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
                            image={(product.photos[0] && product.photos[0].photo) || DEFAULT_PRODUCT_IMAGE}
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

                            <CustomRating averageRating={product.average_rating} countOfReviews={product.count_of_reviews} />
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
