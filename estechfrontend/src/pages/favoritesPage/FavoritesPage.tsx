import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Container, Grid, Typography, CircularProgress, Box } from '@mui/material';
import { fetchFavorites } from '@api/favorites';
import ProductCard from '@components/productCard/ProductCard';
import ErrorText from '@components/errorText/ErrorText';
import ProductList from '@components/productList/ProductList';
import { useFavorites } from '@hooks/useFavorites';

const FAVORITES_QUERY = ['favorites'];

const FavoritesPage: React.FC = () => {
    const {
        data: favorites,
        isLoading,
        isError,
    } = useQuery({
        queryKey: FAVORITES_QUERY,
        queryFn: fetchFavorites,
    });

    if (isLoading) {
        return (
            <Box display='flex' justifyContent='center' alignItems='center' height='100vh'>
                <CircularProgress />
            </Box>
        );
    }

    if (isError || !favorites || favorites.length === 0) {
        return (
            <Container maxWidth='lg'>
                <Typography variant='h4' sx={{ textAlign: 'center', mt: 4 }}>
                    Нет избранных товаров
                </Typography>
                {isError && <ErrorText>Ошибка загрузки избранных товаров.</ErrorText>}
            </Container>
        );
    }

    return (
        <Container maxWidth='lg' sx={{ py: 4 }}>
            <Typography variant='h4' component='h1' gutterBottom>
                Избранные товары
            </Typography>

            <Grid item xs={12} sm={9} sx={{ paddingTop: '0 !important', marginTop: 0 }}>
                <ProductList products={favorites.map((favorite) => favorite.product)} queryKeys={[FAVORITES_QUERY]} />
            </Grid>
        </Container>
    );
};

export default FavoritesPage;
