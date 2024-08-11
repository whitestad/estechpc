import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Container, Grid, Typography, Box, Button, CircularProgress, Paper } from '@mui/material';
import { fetchProductById } from '@api/products';
import ProductPhotos from './ProductPhotos';
import ErrorText from '@components/errorText/ErrorText';

const ProductPage: React.FC = () => {
    const { productId } = useParams<{ productId: string }>();

    // Исправление: передаем объект вместо массива
    const {
        data: product,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ['product', productId],
        queryFn: () => fetchProductById(productId!),
        enabled: !!productId, // Дополнительно: проверка, что productId не undefined
    });

    if (isLoading) {
        return <CircularProgress />;
    }

    if (isError || !product) {
        return <ErrorText>Ошибка загрузки данных товара.</ErrorText>;
    }

    return (
        <Container maxWidth='lg' sx={{ py: 4 }}>
            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <ProductPhotos photos={product.photos} />
                </Grid>

                <Grid item xs={12} md={6}>
                    <Typography variant='h4' component='h1' gutterBottom>
                        {product.name}
                    </Typography>
                    <Typography variant='h6' color='textSecondary' paragraph>
                        {product.short_characteristics}
                    </Typography>
                    <Typography variant='body1' paragraph>
                        {product.description}
                    </Typography>
                    <Typography variant='h5' color='primary' sx={{ mb: 2 }}>
                        {product.price.toLocaleString('ru-RU')} ₽
                    </Typography>

                    <Button variant='contained' color='primary' size='large'>
                        Добавить в корзину
                    </Button>

                    <Box sx={{ mt: 4 }}>
                        <Typography variant='h6'>Характеристики</Typography>
                        <Paper variant='outlined' sx={{ mt: 2, p: 2 }}>
                            {product.attributes.map((attr, index) => (
                                <Typography key={index}>
                                    <strong>{attr.name}:</strong> {attr.value}
                                </Typography>
                            ))}
                        </Paper>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default ProductPage;
