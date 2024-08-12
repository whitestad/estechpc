import { createAuthAxiosInstance } from '@api/authAxios';

const authAxios = createAuthAxiosInstance();

export const addToFavorites = async (productId: number) => {
    const response = await authAxios.post('/products/favorites/', {
        product_id: productId,
    });
    return response.data;
};

export const removeFromFavorites = async (productId: number) => {
    const response = await authAxios.delete(`/products/favorites/${productId}/`);
    return response.data;
};
