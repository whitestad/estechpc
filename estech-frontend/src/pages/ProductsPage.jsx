import { Container, RowContainer } from "@components/common/layouts/Layouts.jsx";
import { useSearchParams } from "react-router-dom";
import apiInstance from "@utils/axios.js";
import { useEffect, useState } from "react";
import { ProductList } from "@components/layout/productsList/ProductList.jsx";
import HeaderText from "@components/common/headerText/HeaderText.jsx";
import FilterPanel from "@components/layout/filterPanel/FilterPanel.jsx";

function ProductPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [products, setProducts] = useState([]);

    async function fetchProducts() {
        try {
            const response = await apiInstance.get(`products/list?${searchParams.toString()}`);
            return await response.data;
        } catch (error) {
            console.error('Ошибка при получении данных:', error);
        }
    }

    useEffect(() => {
        fetchProducts().then(data => {
            const results = data.results;
            setProducts(results);
        });
    }, [searchParams]);

    function handleFilterChange(newFilters) {
        const params = new URLSearchParams(searchParams);

        if (newFilters.category !== undefined) params.set('c', newFilters.category);
        if (newFilters.minPrice !== undefined) params.set('minp', newFilters.minPrice);
        if (newFilters.maxPrice !== undefined) params.set('maxp', newFilters.maxPrice);

        // Remove all previous attributes
        params.delete('attribute');

        if (newFilters.attributes) {
            newFilters.attributes.forEach(attr => {
                params.append('attribute', `${attr.id}:${attr.value}`);
            });
        }

        setSearchParams(params);
    }

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
