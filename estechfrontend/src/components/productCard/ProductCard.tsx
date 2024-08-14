import React from 'react';
import { Card, CardMedia, CardContent, Typography, CardActions, Button } from '@mui/material';

const ProductCard = ({ product }) => {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia component='img' height='140' image={product.image} alt={product.name} />
            <CardContent>
                <Typography gutterBottom variant='h5' component='div'>
                    {product.name}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                    {product.description}
                </Typography>
                <Typography variant='h6' color='primary'>
                    ${product.price}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size='small'>View More</Button>
            </CardActions>
        </Card>
    );
};

export default ProductCard;
