import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { Grid, Container, Button, Drawer, Box, CircularProgress } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { fetchProducts, fetchFilters } from '@api/products';
import FiltersPanel from '@components/filtersPanel/FiltersPanel';
import ProductList from '@components/productList/ProductList';
import LoadingBox from '@components/loadingBox/LoadingBox';
import ErrorText from '@components/errorText/ErrorText';
import { useProductFilters } from '@hooks/useProductFilters';
import theme from '@styles/theme';
import { useInView } from 'react-intersection-observer';

const ProductsPage: React.FC = () => {
    const { categoryId } = useParams<{ categoryId: string }>();
    const categoryID = parseInt(categoryId as string, 10);

    const { selectedFilters, priceRange, updateFilters, updatePriceRange } = useProductFilters();

    const [draftFilters, setDraftFilters] = React.useState(selectedFilters);
    const [draftPriceRange, setDraftPriceRange] = React.useState(priceRange);
    const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
    const { ref, inView } = useInView();

    const {
        data: filtersResponse,
        isLoading: filtersLoading,
        isError: filtersError,
    } = useQuery({
        queryKey: ['filters', categoryID],
        queryFn: () => fetchFilters(categoryID),
    });

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading: productsLoading,
        isError: productsError,
    } = useInfiniteQuery({
        queryKey: ['products', categoryID, selectedFilters, priceRange],
        queryFn: ({ pageParam = 1 }) => fetchProducts(categoryID, selectedFilters, priceRange, pageParam),
        getNextPageParam: (lastPage) => {
            const nextUrl = lastPage.next;
            if (nextUrl) {
                const urlParams = new URLSearchParams(nextUrl.split('?')[1]);
                return urlParams.get('page') ? parseInt(urlParams.get('page')!) : undefined;
            }
            return undefined;
        },
        initialPageParam: 1,
    });

    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, fetchNextPage]);

    const applyFilters = () => {
        updateFilters(draftFilters);
        updatePriceRange(draftPriceRange);
        setIsDrawerOpen(false);
    };

    const toggleDrawer = (open: boolean) => () => {
        setIsDrawerOpen(open);
    };

    if (productsLoading || filtersLoading) {
        return <LoadingBox />;
    }

    if (productsError || filtersError) {
        return <ErrorText>Ошибка загрузки данных.</ErrorText>;
    }

    const products = data?.pages.flatMap((page) => page.results) || [];

    return (
        <Container maxWidth='xl' sx={{ py: 8 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} sx={{ display: { xs: 'block', sm: 'none' }, textAlign: 'right' }}>
                    <Button startIcon={<MenuIcon />} onClick={toggleDrawer(true)}>
                        Фильтры
                    </Button>
                </Grid>

                <Grid
                    item
                    xs={12}
                    sm={3}
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        position: 'sticky',
                        top: theme.spacing(8),
                        alignSelf: 'flex-start',
                        backgroundColor: theme.palette.background.paper,
                        borderRadius: 1,
                        overflowY: 'auto',
                        maxHeight: 'calc(100vh - 64px)',
                        padding: 2,
                    }}
                >
                    <FiltersPanel
                        filters={filtersResponse?.filters}
                        selectedFilters={draftFilters}
                        priceRange={draftPriceRange}
                        onFilterChange={setDraftFilters}
                        onPriceRangeChange={setDraftPriceRange}
                        onApply={applyFilters}
                    />
                </Grid>

                <Grid item xs={12} sm={9} sx={{ paddingTop: '0 !important', marginTop: 0 }}>
                    <ProductList products={products} queryKeys={[['products', categoryID, selectedFilters, priceRange]]} />
                    <div ref={ref} style={{ textAlign: 'center', marginTop: 16 }}>
                        {isFetchingNextPage && <CircularProgress />}
                    </div>
                </Grid>
            </Grid>

            <Drawer anchor='left' open={isDrawerOpen} onClose={toggleDrawer(false)}>
                <Box sx={{ width: 250, p: 2 }}>
                    <FiltersPanel
                        filters={filtersResponse?.filters}
                        selectedFilters={draftFilters}
                        priceRange={draftPriceRange}
                        onFilterChange={setDraftFilters}
                        onPriceRangeChange={setDraftPriceRange}
                        onApply={applyFilters}
                    />
                </Box>
            </Drawer>
        </Container>
    );
};

export default ProductsPage;
