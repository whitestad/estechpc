// src/components/ProductTabs.tsx

import React from 'react';
import { Tabs, Tab, Box, Typography, Paper, List, ListItem, Divider } from '@mui/material';
import { IProductDetail, IReview } from 'types/products';
import theme from '@styles/theme';
import { RatingLite } from '@components/rating/CustomRating';

const ProductTabs: React.FC<{ product: IProductDetail }> = ({ product }) => {
    const [tabValue, setTabValue] = React.useState(0);

    const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setTabValue(newValue);
    };

    return (
        <Box>
            <Tabs value={tabValue} onChange={handleTabChange}>
                <Tab label='Характеристики' />
                <Tab label='Описание' />
                <Tab label='Отзывы' />
            </Tabs>
            {tabValue === 0 && <ProductAttributes attributes={product.attributes} />}
            {tabValue === 1 && <ProductDescription description={product.description} />}
            {tabValue === 2 && <ProductReviews reviews={product.reviews} />}
        </Box>
    );
};

const ProductAttributes: React.FC<{ attributes: { name: string; value: string }[] }> = ({ attributes }) => (
    <Paper variant='outlined' sx={{ mt: 2, p: 2 }}>
        <List dense>
            {attributes.map((attr, index) => (
                <ListItem key={index}>
                    <Typography sx={{ width: '100%', display: 'flex', gap: '1rem', my: 0.5 }}>
                        <strong style={{ minWidth: '50%', borderBottom: `1px dashed ${theme.palette.grey[700]}` }}>{attr.name}:</strong> {attr.value}
                    </Typography>
                </ListItem>
            ))}
        </List>
    </Paper>
);

const ProductDescription: React.FC<{ description: string }> = ({ description }) => (
    <Paper variant='outlined' sx={{ mt: 2, p: 2 }}>
        <Typography variant='h5' sx={{ mt: 2 }}>
            Описание
        </Typography>
        <Typography variant='body1' sx={{ mt: 1 }}>
            {description}
        </Typography>
    </Paper>
);

const ProductReviews: React.FC<{ reviews: IReview[] }> = ({ reviews }) => (
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

export default ProductTabs;
