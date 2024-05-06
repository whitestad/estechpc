import React, {useEffect, useState} from 'react';
import styles from './Basket.module.css'
import Container from "../../../../../../../webstorm/estech-react/src/components/generic/container/Container.jsx";
import Strap from "../../../../../../../webstorm/estech-react/src/components/strap/Strap.jsx";
import axios from "axios";
import ProductListItem from "../productsList/ProductListItem.jsx";


const API_URL = 'http://localhost:8000/api/products';

async function fetchProducts() {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
    }
}

function Basket({children}){

    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts().then(data => {
            console.log(data);
            if (data) {
                setProducts(data);
            }
        });
    }, []);



    return (
        <Container>
            <Strap>
                <h1>Корзина</h1>

                {products.length > 0 ? (
                    products.map((product, index) => (
                        <ProductListItem key={index} info={product}></ProductListItem>
                    ))
                ) : (
                    <p>Ничего не найдено</p>
                )}
            </Strap>

        </Container>
    );
}

export default Basket;
