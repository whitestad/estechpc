import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Typography, CircularProgress, Grid, Container, Button, Drawer, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import apiInstance from '@api/axios';
import FiltersPanel, { FiltersResponse } from '@components/filtersPanel/FiltersPanel';
import ProductList, { Product } from '@components/productList/ProductList';
import LoadingBox from '@components/loadingBox/LoadingBox';
import ErrorText from '@components/errorText/ErrorText';

const fetchProducts = async (categoryId: number | null): Promise<Product[]> => {
    const response = await apiInstance.get(`/products/list/?c=${categoryId || ''}&include_out_of_stock=false`);
    if (response.data && Array.isArray(response.data.results)) {
        return response.data.results;
    }
    throw new Error('Invalid data format: results should be an array');
};

const fetchFilters = async (categoryId: number): Promise<FiltersResponse> => {
    const response = await apiInstance.get(`/products/categories/${categoryId}/filters/`);
    if (response.data) {
        return response.data;
    }
    throw new Error('Invalid data format for filters');
};

const ProductsPage: React.FC = () => {
    const { categoryId } = useParams<{ categoryId: string }>();
    const categoryID = parseInt(categoryId as string, 10);
    const [selectedFilters, setSelectedFilters] = useState<{ [key: string]: string[] }>({});
    const [priceRange, setPriceRange] = useState({ min: 0, max: 0 });
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const {
        data: products,
        isLoading: productsLoading,
        isError: productsError,
    } = useQuery({
        queryKey: ['products', categoryID],
        queryFn: () => fetchProducts(categoryID),
    });

    const {
        data: filtersResponse,
        isLoading: filtersLoading,
        isError: filtersError,
    } = useQuery({
        queryKey: ['filters', categoryID],
        queryFn: () => fetchFilters(categoryID),
    });

    const toggleDrawer = (open: boolean) => () => {
        setIsDrawerOpen(open);
    };

    const applyFilters = (product: Product) => {
        const isWithinPriceRange =
            (priceRange.min === 0 || product.price >= priceRange.min) && (priceRange.max === 0 || product.price <= priceRange.max);

        // Здесь вы можете добавить логику фильтрации по другим критериям (например, по selectedFilters)
        return isWithinPriceRange;
    };

    if (productsLoading || filtersLoading) {
        return <LoadingBox />;
    }

    if (productsError || filtersError) {
        return <ErrorText>Ошибка загрузки данных.</ErrorText>;
    }

    if (!products || products.length === 0) {
        return (
            <Container maxWidth='xl' sx={{ py: 4 }}>
                <Typography variant='h4' align='center'>
                    Нет в наличии
                </Typography>
            </Container>
        );
    }

    return (
        <Container maxWidth='xl' sx={{ py: 4 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} sx={{ display: { xs: 'block', sm: 'none' }, textAlign: 'right' }}>
                    <Button startIcon={<MenuIcon />} onClick={toggleDrawer(true)}>
                        Фильтры
                    </Button>
                </Grid>

                <Grid item xs={3} sx={{ display: { xs: 'none', sm: 'block' } }}>
                    <FiltersPanel
                        filters={filtersResponse?.filters}
                        selectedFilters={selectedFilters}
                        priceRange={priceRange}
                        onFilterChange={setSelectedFilters}
                        onPriceRangeChange={setPriceRange}
                    />
                </Grid>

                <Grid item xs={12} sm={9}>
                    <ProductList products={products.filter(applyFilters)} />
                </Grid>
            </Grid>

            <Drawer anchor='left' open={isDrawerOpen} onClose={toggleDrawer(false)}>
                <Box sx={{ width: 250, p: 2 }}>
                    <FiltersPanel
                        filters={filtersResponse?.filters}
                        selectedFilters={selectedFilters}
                        priceRange={priceRange}
                        onFilterChange={setSelectedFilters}
                        onPriceRangeChange={setPriceRange}
                    />
                </Box>
            </Drawer>
        </Container>
    );
};

export default ProductsPage;
