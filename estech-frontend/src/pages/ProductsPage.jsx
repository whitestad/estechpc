import {SimpleCard} from "@components/layout/card/Card.jsx";
import {Container, Grid} from "@components/common/layouts/Layouts.jsx";
import {useNavigate, useSearchParams} from "react-router-dom";
import apiInstance from "@utils/axios.js";
import {useEffect, useState} from "react";

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
            {!products ?
                <h1>Загрузка...</h1>
                :
                <>
                    <h1>Каталог товаров</h1>

                    <Grid>
                        {products.map((product) => (
                            <SimpleCard key={product.id}
                                        image={product.photos[0].photo}
                                        onClick={() => handleNavigateProduct(product)}>
                                {product.title}
                            </SimpleCard>
                        ))}
                    </Grid>
                </>
            }
        </Container>
    );
}

export default ProductPage;
