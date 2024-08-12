import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Box, Typography, CircularProgress, Paper, List, ListItem, Divider } from '@mui/material';
import { fetchProductReviews } from '@api/products';
import { RatingLite } from '@components/rating/CustomRating';
import theme from '@styles/theme';

const ProductReviews: React.FC = () => {
    const { productId } = useParams<{ productId: string }>();

    const {
        data: reviews,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ['productReviews', productId],
        queryFn: () => fetchProductReviews(productId!),
        staleTime: 5 * 60 * 1000,
        enabled: !!productId,
    });

    if (isLoading) {
        return <CircularProgress />;
    }

    if (isError || !reviews) {
        return <Typography color='error'>Ошибка загрузки отзывов.</Typography>;
    }

    return (
        <Paper variant='outlined' sx={{ mt: 2, p: 2 }}>
            <List>
                {reviews.length > 0 ? (
                    reviews.map((review, index) => (
                        <>
                            <ListItem key={index}>
                                <Box>
                                    <Typography variant='h6' sx={{ mt: 2 }}>
                                        {review.username}
                                    </Typography>
                                    <RatingLite rating={review.rating} />
                                    <Typography variant='body2'>{review.text}</Typography>
                                    <Typography variant='caption' color='textSecondary'>
                                        {new Date(review.created_at).toLocaleDateString()}
                                    </Typography>
                                </Box>
                            </ListItem>

                            <Divider component='li' sx={{ borderColor: theme.palette.grey[800] }} />
                        </>
                    ))
                ) : (
                    <Typography variant='body2'>Нет отзывов</Typography>
                )}
            </List>
        </Paper>
    );
};

export default ProductReviews;
