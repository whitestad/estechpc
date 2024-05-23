
import styles from './Basket.module.css'
import {useEffect, useState} from "react";
import {Container, RowContainer} from "@components/common/layouts/Layouts.jsx";
import Strap from "@components/common/strap/Strap.jsx";
import useAxios from "@utils/useAxios.js";
import BasketItem from "@components/layout/basket/BasketItem.jsx";

const axiosInstance = useAxios();
const API_URL = 'http://localhost:8000/api/orders/basket/';

async function fetchProducts() {
    try {
        const response = await axiosInstance.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
    }
}

function Basket({children}){

    const [items, setItems] = useState([]);

    useEffect(() => {
        fetchProducts().then(data => {
            if (data) {
                setItems(data.items);

                console.log(data.items);
            }
        });
    }, []);



    return (
        <Container>
            <h1>Корзина</h1>

            <RowContainer>
                <div className={styles.items}>
                    {items.length > 0 ? (
                        items.map((item, index) => (
                            <BasketItem key={index}
                                        product={item}
                                        title={item.product.title}
                                        photo={item.product.photos[0].photo}
                                        price={item.product.price}
                            />
                        ))
                    ) : (
                        <p>Ничего не найдено</p>
                    )}
                </div>

                <Strap extraClasses={[styles.check]}>

                </Strap>
            </RowContainer>

        </Container>
    );
}

export default Basket;
