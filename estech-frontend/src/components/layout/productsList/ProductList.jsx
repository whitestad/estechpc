import styles from "./ProductsList.module.css";
import {Container} from "@components/common/layouts/Layouts.jsx";
import ProductListItem from "@components/layout/productsList/ProductListItem.jsx";
import {useNavigate} from "react-router-dom";

function ProductList({products}) {
    const navigate = useNavigate();

    function handleNavigateProduct(id){
        return navigate(`/products/${id}`);
    }

    return (
        <Container marginTop={'0'}>
            {!products ?
                <h1>Загрузка...</h1>
                :
                <>
                    {products.map((product) => (
                        <ProductListItem key={product.id} onClick={() => handleNavigateProduct(product.id)} {...product}></ProductListItem>
                    ))}
                </>
            }
        </Container>
    );
}

export {ProductList};