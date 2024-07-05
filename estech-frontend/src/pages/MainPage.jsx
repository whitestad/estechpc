import {useAuthStore} from "../store/auth";
import {Container} from "@components/common/layouts/Layouts.jsx";
import {ProductList} from "@components/layout/productsList/ProductList.jsx";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import apiInstance from "@utils/axios.js";

function MainPage() {
    const [isLoggedIn, user] = useAuthStore((state) => [
        state.isLoggedIn,
        state.user,
    ]);

    const [products, setProducts] = useState([]);

    async function fetchProducts() {
        try {
            const response = await apiInstance.get(`products/list`);
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

    return (
        <Container>
            <h1>Все товары товаров</h1>
            <ProductList products={products}/>
        </Container>
    );
}

export default MainPage;
