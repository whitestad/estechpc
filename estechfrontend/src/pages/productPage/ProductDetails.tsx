// src/components/ProductDetails.tsx

import React from 'react';
import { Typography, Box, Button } from '@mui/material';
import { IProductDetail } from 'types/products';
import FlexBox from '@components/flexBox/FlexBox';
import CustomRating from '@components/rating/CustomRating';
import FavoriteButton from '@components/favoriteButton/FavoriteButton';

interface ProductDetailsProps {
    product: IProductDetail;
    toggleFavorite: (productId: number, isFavorite: boolean) => void;
    isLoading: boolean;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product, toggleFavorite, isLoading }) => (
    <Box>
        <Typography variant='h4' component='h1' gutterBottom>
            {product.name}
        </Typography>
        <Typography variant='subtitle1' color='textSecondary' paragraph>
            {product.short_characteristics}
        </Typography>
        <Typography variant='h5' color='primary' sx={{ mb: 2 }}>
            {product.price.toLocaleString('ru-RU')} ₽
        </Typography>

        <CustomRating averageRating={product.average_rating} countOfReviews={product.count_of_reviews} />

        <FlexBox bgColor={'transparent'} sx={{ mt: 2 }}>
            <Button variant='contained' color='primary' size='large'>
                Добавить в корзину
            </Button>

            <FavoriteButton productId={product.id} isFavorite={product.is_favorite} toggleFavorite={toggleFavorite} isLoading={isLoading} />
        </FlexBox>
    </Box>
);

export default ProductDetails;
