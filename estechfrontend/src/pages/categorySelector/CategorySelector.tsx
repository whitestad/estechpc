import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import {
    Typography,
    Card,
    CardMedia,
    CardContent,
    CircularProgress,
    Grid,
    Container,
} from "@mui/material";
import apiInstance from "@api/axios";

interface Category {
    id: number;
    parent: Category | null;
    name: string;
    image: string | null;
}

interface ChildCategory {
    id: number;
    name: string;
}

const fetchCategories = async (
    parentId: number | null
): Promise<Category[]> => {
    const response = await apiInstance.get<Category[]>(
        `/products/categories/?parent_id=${parentId !== null ? parentId : 0}`
    );
    return response.data;
};

const fetchChildrenCategories = async (
    categoryId: number
): Promise<ChildCategory[]> => {
    const response = await apiInstance.get<ChildCategory[]>(
        `/products/categories/${categoryId}/children/`
    );
    return response.data;
};

const CategorySelector: React.FC = () => {
    const { parentId } = useParams<{ parentId: string }>();
    const navigate = useNavigate();
    const selectedCategoryId = parentId ? parseInt(parentId, 10) : null;

    const {
        data: categories,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["categories", selectedCategoryId],
        queryFn: () => fetchCategories(selectedCategoryId),
        keepPreviousData: true,
    });

    const handleCategoryClick = async (category: Category) => {
        try {
            const children = await fetchChildrenCategories(category.id);
            if (children.length > 0) {
                // Если есть дочерние категории, переходим к ним
                navigate(`/categories/${category.id}`);
            } else {
                // Если дочерних категорий нет, открываем страницу товаров
                navigate(`/categories/${category.id}/products`);
            }
        } catch (error) {
            console.error("Ошибка загрузки дочерних категорий:", error);
            navigate(`/categories/${category.id}/products`); // На случай ошибки, продолжаем с продуктами
        }
    };

    const defaultImage = "https://via.placeholder.com/550";

    if (isLoading) {
        return <CircularProgress />;
    }

    if (isError) {
        return <Typography color="error">Ошибка загрузки категорий.</Typography>;
    }

    return (
        <Container maxWidth={"xl"} sx={{ py: 4 }}>
            <Typography variant="h4" gutterBottom>
                Выберите категорию
            </Typography>
            <Grid container spacing={2}>
                {Array.isArray(categories) &&
                    categories.map((category) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={category.id}>
                            <Card
                                onClick={() => handleCategoryClick(category)}
                                style={{ cursor: "pointer" }}
                            >
                                <CardMedia
                                    component="img"
                                    height="280"
                                    image={category.image || defaultImage}
                                    alt={category.name}
                                />
                                <CardContent>
                                    <Typography variant="h6" component="div">
                                        {category.name}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
            </Grid>
        </Container>
    );
};

export default CategorySelector;
