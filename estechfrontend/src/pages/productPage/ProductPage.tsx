import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Container, Grid, Typography, Box, Button, CircularProgress, Paper } from '@mui/material';
import { fetchProductById } from '@api/products';
import { addToFavorites, removeFromFavorites } from '@api/favorites';
import ProductPhotos from './ProductPhotos';
import ErrorText from '@components/errorText/ErrorText';
import FlexBox from '@components/flexBox/FlexBox';
import { queryClient } from '@src/queryClient';
import { IProductDetail } from 'types/products';

const ProductPage: React.FC = () => {
    const { productId } = useParams<{ productId: string }>();

    const {
        data: product,
        isLoading,
        isError,
    } = useQuery<IProductDetail>({
        queryKey: ['product', productId],
        queryFn: () => fetchProductById(productId!),
        enabled: !!productId,
    });

    const handleSuccess = (isFavorite: boolean) => {
        queryClient.setQueryData(['product', productId], (oldData: IProductDetail | undefined) => {
            if (!oldData) {
                console.error('No old data found!');
                return undefined;
            }
            return {
                ...oldData,
                is_favorite: isFavorite,
            };
        });
    };

    const handleError = (error: unknown, action: string) => {
        console.error(`Ошибка при ${action}:`, error);
    };

    const addToFavoritesMutation = useMutation({
        mutationFn: addToFavorites,
        onSuccess: () => handleSuccess(true),
        onError: (error) => handleError(error, 'добавлении в избранное'),
    });

    const removeFromFavoritesMutation = useMutation({
        mutationFn: removeFromFavorites,
        onSuccess: () => handleSuccess(false),
        onError: (error) => handleError(error, 'удалении из избранного'),
    });

    const handleToggleFavorite = () => {
        if (product?.is_favorite) {
            removeFromFavoritesMutation.mutate(product!.id);
        } else {
            addToFavoritesMutation.mutate(product!.id);
        }
    };

    if (isLoading) return <LoadingState />;
    if (isError || !product) return <ErrorText>Ошибка загрузки данных товара.</ErrorText>;

    return (
        <ProductDetails
            product={product}
            onToggleFavorite={handleToggleFavorite}
            isLoading={addToFavoritesMutation.isPending || removeFromFavoritesMutation.isPending}
        />
    );
};

const LoadingState = () => (
    <Box display='flex' justifyContent='center' alignItems='center' height='100vh'>
        <CircularProgress />
    </Box>
);

interface ProductDetailsProps {
    product: IProductDetail;
    onToggleFavorite: () => void;
    isLoading: boolean;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product, onToggleFavorite, isLoading }) => (
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

                <FlexBox bgColor={'transparent'}>
                    <Button variant='contained' color='primary' size='large'>
                        Добавить в корзину
                    </Button>

                    <Button variant='contained' color='secondary' size='large' onClick={onToggleFavorite} disabled={isLoading}>
                        {product.is_favorite ? 'Удалить из избранного' : 'Добавить в избранное'}
                    </Button>
                </FlexBox>

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

export default ProductPage;
