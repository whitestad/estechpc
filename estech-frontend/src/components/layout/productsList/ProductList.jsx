import styles from "./ProductsList.module.css";
import {Container} from "@components/common/layouts/Layouts.jsx";
import ProductListItem from "@components/layout/productsList/ProductListItem.jsx";

function ProductList({products}) {
    return (
        <Container marginTop={'0'}>
            {!products ?
                <h1>Загрузка...</h1>
                :
                <>
                    {products.map((product) => (
                        <ProductListItem key={product.id} {...product}></ProductListItem>
                    ))}
                </>
            }
        </Container>
    );
}

export {ProductList};