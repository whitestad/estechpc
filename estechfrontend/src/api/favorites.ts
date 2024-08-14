import { createAuthAxiosInstance } from '@api/authAxios';
import { IFavorite } from 'types/favorites';

const authAxios = createAuthAxiosInstance();

export const fetchFavorites = async (): Promise<IFavorite[]> => {
    const response = await authAxios.get('/products/favorites/');
    console.log(response);
    return response.data;
};

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
