// src/components/AllProductsPage.tsx

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Grid, Container, Typography } from '@mui/material';
import { fetchAllProducts } from '@api/products';
import ProductList from '@components/productList/ProductList';
import LoadingBox from '@components/loadingBox/LoadingBox';
import ErrorText from '@components/errorText/ErrorText';

const AllProductsPage: React.FC = () => {
    const {
        data: products,
        isLoading: productsLoading,
        isError: productsError,
    } = useQuery({
        queryKey: ['allProducts'],
        queryFn: fetchAllProducts,
    });

    if (productsLoading) {
        return <LoadingBox />;
    }

    if (productsError) {
        return <ErrorText>Ошибка загрузки данных.</ErrorText>;
    }

    return (
        <Container maxWidth='xl' sx={{ py: 8 }}>
            <Typography variant='h4' gutterBottom>
                Все товары
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <ProductList products={products ? products : []} />
                </Grid>
            </Grid>
        </Container>
    );
};

export default AllProductsPage;
