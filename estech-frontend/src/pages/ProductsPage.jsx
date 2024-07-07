import {Container, RowContainer} from "@components/common/layouts/Layouts.jsx";
import {useNavigate, useSearchParams} from "react-router-dom";
import apiInstance from "@utils/axios.js";
import {useEffect, useState} from "react";
import {ProductList} from "@components/layout/productsList/ProductList.jsx";
import HeaderText from "@components/common/headerText/HeaderText.jsx";
import FilterPanel from "@components/layout/filterPanel/FilterPanel.jsx";

function ProductPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const category = searchParams.get('c');
    const priceRange = searchParams.get('p');

    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    async function fetchProducts() {
        try {
            const response = await apiInstance.get(`products/list?c=${category}&p=${priceRange}`);
            return await response.data;
        } catch (error) {
            console.error('Ошибка при получении данных:', error);
        }
    }

    useEffect(() => {
        fetchProducts().then(data => {
            const results = data.results;
            console.log(results);
            setProducts(results);
        });
    }, [category, priceRange]);

    function handleFilterChange(newFilters) {
        const params = new URLSearchParams();
        if (newFilters.category) params.set('c', newFilters.category);
        if (newFilters.priceRange) params.set('p', newFilters.priceRange);
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
