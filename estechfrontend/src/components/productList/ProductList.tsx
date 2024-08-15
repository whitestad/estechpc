import React from 'react';
import { Grid, Card, CardContent, CardMedia, Typography, Box, CircularProgress, IconButton } from '@mui/material';
import { IProduct } from 'types/products';
import { useNavigate } from 'react-router-dom';
import { DEFAULT_PRODUCT_IMAGE } from '@utils/constans';
import CustomRating from '@components/rating/CustomRating';
import { useFavorites } from '@hooks/useFavorites';
import FavoriteButton from '@components/favoriteButton/FavoriteButton';
import AddShoppingCartRoundedIcon from '@mui/icons-material/AddShoppingCartRounded';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import theme from '@styles/theme';

export interface ProductListProps {
    products: IProduct[];
    queryKey: unknown[][];
}

const ProductList: React.FC<ProductListProps> = ({ products, queryKey }) => {
    const navigate = useNavigate();
    const { toggleFavorite, isAdding, isRemoving } = useFavorites(queryKey);

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
                        <CardContent
                            sx={{ textAlign: 'left', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
                        >
                            <Box>
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
                            </Box>

                            <Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, my: 2 }}>
                                    <Typography variant='h6' sx={{ color: 'primary.main', flex: 1 }}>
                                        {product.price.toLocaleString('ru-RU')} ₽
                                    </Typography>

                                    <FavoriteButton
                                        productId={product.id}
                                        isFavorite={product.is_favorite}
                                        toggleFavorite={toggleFavorite}
                                        isLoading={isAdding || isRemoving}
                                        sx={{ backgroundColor: theme.palette.background.default, borderRadius: 1 }}
                                    />

                                    <IconButton sx={{ color: 'primary.contrastText', backgroundColor: 'primary.main', borderRadius: 1 }}>
                                        <ShoppingCartRoundedIcon />
                                    </IconButton>
                                </Box>

                                <CustomRating averageRating={product.average_rating} countOfReviews={product.count_of_reviews} />
                                <Typography variant='body2' sx={{ color: 'text.secondary', mt: 1 }}>
                                    Заказы: {product.count_of_orders}
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default ProductList;
