import { Container, RowContainer } from "@components/common/layouts/Layouts.jsx";
import { useSearchParams } from "react-router-dom";
import apiInstance from "@utils/axios.js";
import { useEffect, useState, useCallback } from "react";
import { ProductList } from "@components/layout/productsList/ProductList.jsx";
import HeaderText from "@components/common/headerText/HeaderText.jsx";
import FilterPanel from "@components/layout/filterPanel/FilterPanel.jsx";

function ProductPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [products, setProducts] = useState([]);

    const fetchProducts = useCallback(async () => {
        try {
            const response = await apiInstance.get(`products/list?${searchParams.toString()}`);
            setProducts(response.data.results);
        } catch (error) {
            console.error('Ошибка при получении данных:', error);
        }
    }, [searchParams]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const handleFilterChange = useCallback((newFilters) => {
        const params = new URLSearchParams(searchParams);

        if (newFilters.category !== undefined) params.set('c', newFilters.category);
        if (newFilters.minPrice !== undefined) params.set('minp', newFilters.minPrice);
        if (newFilters.maxPrice !== undefined) params.set('maxp', newFilters.maxPrice);

        params.delete('attribute');
        if (newFilters.attributes) {
            newFilters.attributes.forEach(attr => {
                params.append('attribute', `${attr.id}:${attr.value}`);
            });
        }

        setSearchParams(params);
    }, [searchParams, setSearchParams]);

    return (
        <Container>
            <HeaderText secondFont>Каталог товаров</HeaderText>
            <RowContainer>
                <FilterPanel onFilterChange={handleFilterChange} />
                <ProductList products={products} />
            </RowContainer>
        </Container>
    );
}

export default ProductPage;
