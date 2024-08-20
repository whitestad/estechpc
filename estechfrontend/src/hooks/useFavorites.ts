import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addToFavorites, fetchFavorites, removeFromFavorites } from '@api/favorites';

export const FAVORITES_QUERY = ['favorites'];

export const useFavorites = (invalidateQueries: unknown[][] = [['products']]) => {
    const queryClient = useQueryClient();

    const {
        data: favorites,
        isLoading,
        isError,
    } = useQuery({
        queryKey: FAVORITES_QUERY,
        queryFn: fetchFavorites,
    });

    const addToFavoritesMutation = useMutation({
        mutationFn: addToFavorites,
        onSuccess: () => {
            if (invalidateQueries) {
                invalidateQueries.forEach((q) => {
                    queryClient.invalidateQueries({
                        queryKey: q,
                    });

                    queryClient.invalidateQueries({
                        queryKey: FAVORITES_QUERY,
                    });
                });
            }
        },
    });

    const removeFromFavoritesMutation = useMutation({
        mutationFn: removeFromFavorites,
        onSuccess: () => {
            if (invalidateQueries) {
                invalidateQueries.forEach((q) => {
                    queryClient.invalidateQueries({
                        queryKey: q,
                    });

                    queryClient.invalidateQueries({
                        queryKey: FAVORITES_QUERY,
                    });
                });
            }
        },
    });

    const toggleFavorite = (productId: number, isFavorite: boolean) => {
        if (isFavorite) {
            removeFromFavoritesMutation.mutate(productId);
        } else {
            addToFavoritesMutation.mutate(productId);
        }
    };

    const isAdding = addToFavoritesMutation.status === 'pending';
    const isRemoving = removeFromFavoritesMutation.status === 'pending';

    return {
        favorites,
        isLoading,
        isError,
        toggleFavorite,
        isAdding,
        isRemoving,
    };
};
