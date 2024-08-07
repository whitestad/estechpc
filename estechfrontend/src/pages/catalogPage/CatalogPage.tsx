import React from "react";
import { Container, Typography } from "@mui/material";
import ProductList from "@components/productList/ProductList";

import img1 from "@assets/images/pcs/pc_components.jpg";
import img2 from "@assets/images/pcs/pc_power.jpg";

const products = [
    { id: 1, name: "Laptop", description: "High-performance laptop", price: 999, image: img1 },
    { id: 2, name: "Keyboard", description: "Mechanical keyboard", price: 199, image: img2 },
    // Добавьте другие продукты по вашему выбору
];

const CatalogPage = () => {
    return (
        <Container>
            <Typography variant="h4" component="h1" gutterBottom>
                Product Catalog
            </Typography>
            <ProductList products={products} />
        </Container>
    );
};

export default CatalogPage;
