// src/components/ProductDetails.tsx

import React from 'react';
import { Typography, Box, Button, IconButton, CircularProgress } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { IProductDetail } from 'types/products';
import FlexBox from '@components/flexBox/FlexBox';
import CustomRating from '@components/rating/CustomRating';

interface ProductDetailsProps {
    product: IProductDetail;
    onToggleFavorite: () => void;
    isLoading: boolean;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product, onToggleFavorite, isLoading }) => (
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

            <IconButton
                size='medium'
                onClick={onToggleFavorite}
                disabled={isLoading}
                sx={{ color: product.is_favorite ? 'primary.main' : 'primary.main' }}
            >
                {isLoading ? (
                    <CircularProgress size={28} />
                ) : product.is_favorite ? (
                    <FavoriteIcon sx={{ fontSize: 28 }} />
                ) : (
                    <FavoriteBorderIcon sx={{ fontSize: 28 }} />
                )}
            </IconButton>
        </FlexBox>
    </Box>
);

export default ProductDetails;
