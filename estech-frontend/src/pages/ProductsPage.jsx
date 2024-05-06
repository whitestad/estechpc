import {Container, Grid} from "@components/common/layouts/Layouts.jsx";
import {useNavigate, useSearchParams} from "react-router-dom";
import apiInstance from "@utils/axios.js";
import {useEffect, useState} from "react";
import {ProductList} from "@components/layout/productsList/ProductList.jsx";

function ProductPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const category = searchParams.get('c');

    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    async function fetchProducts() {
        try {
            const response = await apiInstance.get(`products/list?c=${category}`);
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
    }, []);

    function handleNavigateProduct(category){
        return navigate(`/products?c=${category.id}`);
    }

    return (
        <Container>
            <h1>Каталог товаров</h1>
            <ProductList products={products}/>
        </Container>
    );
}

export default ProductPage;
