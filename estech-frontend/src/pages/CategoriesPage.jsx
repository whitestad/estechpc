import {SimpleCard} from "@components/layout/card/Card.jsx";
import {Container, Grid} from "@components/common/layouts/Layouts.jsx";
import {useEffect, useState} from "react";
import apiInstance from "@utils/axios.js";
import {useNavigate} from "react-router-dom";


function CategoriesPage() {

    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    async function fetchCategories() {
        try {
            const response = await apiInstance.get('products/categories/');
            return await response.data;
        } catch (error) {
            console.error('Ошибка при получении данных:', error);
        }
    }

    useEffect(() => {
        fetchCategories().then(data => {
            const results = data.results;
            setCategories(results);
        });
    }, []);

    function handleNavigateCategory(category){
        return navigate(`/products?c=${category.id}`);
    }


    return (
        <Container>
            {!categories ?
                <h1>Загрузка...</h1>
                :
                <>
                    <h1>Каталог товаров</h1>

                    <Grid>
                        {categories.map((category) => (
                            <SimpleCard key={category.id}
                                        image={category.image}
                                        onClick={() => handleNavigateCategory(category)}>
                                {category.title}
                            </SimpleCard>
                        ))}
                    </Grid>
                </>
            }
        </Container>
    );
}

export default CategoriesPage;
