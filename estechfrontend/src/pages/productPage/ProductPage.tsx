// src/components/ProductPage.tsx

import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Container, Grid, Typography, Box, CircularProgress } from '@mui/material';
import { fetchProductById } from '@api/products';
import { addToFavorites, removeFromFavorites } from '@api/favorites';
import ProductPhotos from './ProductPhotos';
import ErrorText from '@components/errorText/ErrorText';
import { queryClient } from '@src/queryClient';
import { IProductDetail } from 'types/products';
import ProductDetails from './ProductDetails';
import ProductTabs from './ProductTabs';
import LoadingBox from '@components/loadingBox/LoadingBox';

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

    if (isLoading) return <LoadingBox />;
    if (isError || !product) return <ErrorText>Ошибка загрузки данных товара.</ErrorText>;

    return (
        <Container maxWidth='lg' sx={{ my: 4, py: 4, backgroundColor: 'background.paper', borderRadius: 2 }}>
            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <ProductPhotos photos={product.photos} />
                </Grid>

                <Grid item xs={12} md={6}>
                    <ProductDetails
                        product={product}
                        onToggleFavorite={handleToggleFavorite}
                        isLoading={addToFavoritesMutation.isPending || removeFromFavoritesMutation.isPending}
                    />
                </Grid>

                <Grid item xs={12}>
                    <ProductTabs product={product} />
                </Grid>
            </Grid>
        </Container>
    );
};

export default ProductPage;
