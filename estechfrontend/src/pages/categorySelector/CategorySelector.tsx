import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { Typography, Card, CardMedia, CardContent, CircularProgress, Grid, Container } from "@mui/material";
import apiInstance from "@api/axios";

interface Category {
    id: number;
    parent: Category | null;
    name: string;
    image: string | null;
}

const fetchCategories = async (parentId: number | null): Promise<Category[]> => {
    const response = await apiInstance.get<Category[]>(`/products/categories/?parent_id=${parentId !== null ? parentId : 0}`);
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

    const handleCategoryClick = (categoryId: number) => {
        navigate(`/categories/${categoryId}`);
    };

    const defaultImage = "https://via.placeholder.com/550"; // URL дефолтного изображения

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
                            <Card onClick={() => handleCategoryClick(category.id)} style={{ cursor: "pointer" }}>
                                <CardMedia component="img" height="280" image={category.image || defaultImage} alt={category.name} />
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
