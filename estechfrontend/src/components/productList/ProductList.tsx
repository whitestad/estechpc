import React from "react";
import { Grid, Card, CardContent, CardMedia, Typography } from "@mui/material";

export interface Product {
    id: number;
    name: string;
    short_characteristics: string;
    description: string;
    price: number;
    photos: string[];
    average_rating: number | null;
    count_of_reviews: number;
    count_of_orders: number;
}

export interface ProductListProps {
    products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
    return (
        <Grid container spacing={2}>
            {products.map((product) => (
                <Grid item xs={12} sm={6} md={4} key={product.id}>
                    <Card>
                        <CardMedia
                            component="img"
                            height="250"
                            image={product.photos[0] || "https://via.placeholder.com/250"}
                            alt={product.name}
                        />
                        <CardContent>
                            <Typography variant="h6">{product.name}</Typography>
                            <Typography variant="body2">
                                Цена: {product.price.toLocaleString("ru-RU")} ₽
                            </Typography>
                            <Typography variant="body2">
                                {product.short_characteristics}
                            </Typography>
                            {product.average_rating && (
                                <Typography variant="body2">
                                    Средний рейтинг: {product.average_rating}
                                </Typography>
                            )}
                            <Typography variant="body2">
                                Отзывы: {product.count_of_reviews}
                            </Typography>
                            <Typography variant="body2">
                                Заказы: {product.count_of_orders}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default ProductList;
