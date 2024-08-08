import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
    Typography,
    CircularProgress,
    Grid,
    Card,
    CardContent,
    CardMedia,
    List,
    FormGroup,
    FormControlLabel,
    Checkbox,
    Container,
    Button,
    Drawer,
    Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import apiInstance from "@api/axios";

interface Product {
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

interface Filter {
    id: number;
    name: string;
    values: string[];
}

interface FiltersResponse {
    id: number;
    name: string;
    filters: Filter[];
}

const fetchProducts = async (categoryId: number): Promise<Product[]> => {
    try {
        const response = await apiInstance.get(`/products/list/?c=${categoryId}`);

        // Проверяем, что `results` существует и является массивом
        if (response.data && Array.isArray(response.data.results)) {
            return response.data.results;
        }
        throw new Error("Invalid data format: results should be an array");
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
};

const fetchFilters = async (categoryId: number): Promise<FiltersResponse> => {
    try {
        const response = await apiInstance.get(`/products/categories/${categoryId}/filters/`);
        if (response.data) {
            return response.data;
        }
        throw new Error("Invalid data format for filters");
    } catch (error) {
        console.error("Error fetching filters:", error);
        throw error;
    }
};

const ProductsPage: React.FC = () => {
    const { categoryId } = useParams<{ categoryId: string }>();
    const categoryID = parseInt(categoryId, 10);

    const [selectedFilters, setSelectedFilters] = useState<{ [key: string]: string[] }>({});
    const [isDrawerOpen, setIsDrawerOpen] = useState(false); // Управление состоянием выдвижной панели

    const {
        data: products,
        isLoading: productsLoading,
        isError: productsError,
    } = useQuery({
        queryKey: ["products", categoryID],
        queryFn: () => fetchProducts(categoryID),
    });

    const {
        data: filtersResponse,
        isLoading: filtersLoading,
        isError: filtersError,
    } = useQuery({
        queryKey: ["filters", categoryID],
        queryFn: () => fetchFilters(categoryID),
    });

    const handleFilterChange = (filterId: string, value: string) => {
        setSelectedFilters((prev) => {
            const currentValues = prev[filterId] || [];
            const newValues = currentValues.includes(value) ? currentValues.filter((v) => v !== value) : [...currentValues, value];
            return { ...prev, [filterId]: newValues };
        });
    };

    const toggleDrawer = (open: boolean) => () => {
        setIsDrawerOpen(open);
    };

    if (productsLoading || filtersLoading) {
        return <CircularProgress />;
    }

    if (productsError || filtersError) {
        return <Typography color="error">Ошибка загрузки данных.</Typography>;
    }

    const applyFilters = (product: Product) => {
        // Логика применения фильтров
        return true;
    };

    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            <Grid container spacing={2}>
                {/* Кнопка для открытия панели фильтров на мобильных устройствах */}
                <Grid item xs={12} sx={{ display: { xs: "block", sm: "none" }, textAlign: "right" }}>
                    <Button startIcon={<MenuIcon />} onClick={toggleDrawer(true)}>
                        Фильтры
                    </Button>
                </Grid>

                {/* Панель фильтров для больших экранов */}
                <Grid item xs={3} sx={{ display: { xs: "none", sm: "block" } }}>
                    <Typography variant="h6">Фильтры</Typography>
                    <List>
                        {filtersResponse?.filters.map((filter) => (
                            <FormGroup key={filter.id}>
                                <Typography variant="subtitle1">{filter.name}</Typography>
                                {filter.values.map((value) => (
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={selectedFilters[filter.id]?.includes(value) || false}
                                                onChange={() => handleFilterChange(filter.id.toString(), value)}
                                            />
                                        }
                                        label={value}
                                        key={value}
                                    />
                                ))}
                            </FormGroup>
                        ))}
                    </List>
                </Grid>

                {/* Основная область с товарами */}
                <Grid item xs={12} sm={9}>
                    <Grid container spacing={2}>
                        {products?.filter(applyFilters).map((product) => (
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
                                        <Typography variant="body2">Цена: {product.price} ₽</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>

            {/* Выдвижная панель фильтров для мобильных устройств */}
            <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer(false)}>
                <Box sx={{ width: 250, p: 2 }}>
                    <Typography variant="h6">Фильтры</Typography>
                    <List>
                        {filtersResponse?.filters.map((filter) => (
                            <FormGroup key={filter.id}>
                                <Typography variant="subtitle1">{filter.name}</Typography>
                                {filter.values.map((value) => (
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={selectedFilters[filter.id]?.includes(value) || false}
                                                onChange={() => handleFilterChange(filter.id.toString(), value)}
                                            />
                                        }
                                        label={value}
                                        key={value}
                                    />
                                ))}
                            </FormGroup>
                        ))}
                    </List>
                </Box>
            </Drawer>
        </Container>
    );
};

export default ProductsPage;
