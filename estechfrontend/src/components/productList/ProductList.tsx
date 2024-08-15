// src/components/ProductList.tsx
import React from 'react';
import { Grid, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { IProduct } from 'types/products';
import { useNavigate } from 'react-router-dom';
import { DEFAULT_PRODUCT_IMAGE } from '@utils/constans';
import CustomRating from '@components/rating/CustomRating';
import { useFavorites } from '@hooks/useFavorites';
import FavoriteButton from '@components/favoriteButton/FavoriteButton';

export interface ProductListProps {
    products: IProduct[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
    const navigate = useNavigate();
    const { toggleFavorite, isAdding, isRemoving } = useFavorites();

    return (
        <Grid container spacing={2}>
            {products.map((product) => (
                <Grid item xs={12} sm={6} md={4} xl={3} key={product.id}>
                    <Card
                        onClick={() => navigate(`/products/${product.id}`)}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            height: '100%',
                            borderRadius: 1,
                            boxShadow: 1,
                            overflow: 'hidden',
                            transition: 'transform 0.3s, box-shadow 0.3s',
                            '&:hover': {
                                transform: 'scale(1.02)',
                                boxShadow: 3,
                            },
                        }}
                    >
                        <CardMedia
                            component='img'
                            height='200'
                            image={(product.photos[0] && product.photos[0].photo) || DEFAULT_PRODUCT_IMAGE}
                            alt={product.name}
                            sx={{ objectFit: 'cover' }}
                        />
                        <CardContent sx={{ textAlign: 'left', flexGrow: 1 }}>
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
                                {product.short_characteristics || 'Краткие характеристики не указаны'}
                            </Typography>
                            <Typography variant='h6' sx={{ color: 'primary.main', mb: 1 }}>
                                {product.price.toLocaleString('ru-RU')} ₽
                            </Typography>
                            <CustomRating averageRating={product.average_rating} countOfReviews={product.count_of_reviews} />
                            <Typography variant='body2' sx={{ color: 'text.secondary', mt: 1 }}>
                                Заказы: {product.count_of_orders}
                            </Typography>
                        </CardContent>
                        <FavoriteButton
                            productId={product.id}
                            isFavorite={product.is_favorite}
                            toggleFavorite={toggleFavorite}
                            isLoading={isAdding || isRemoving}
                        />
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default ProductList;
