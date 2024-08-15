import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addToFavorites, removeFromFavorites } from '@api/favorites';

export const useFavorites = (invalidateQueries: unknown[][] = [['products']]) => {
    const queryClient = useQueryClient();

    const addToFavoritesMutation = useMutation({
        mutationFn: addToFavorites,
        onSuccess: () => {
            if (invalidateQueries) {
                invalidateQueries.forEach((q) => {
                    queryClient.invalidateQueries({
                        queryKey: q,
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
        toggleFavorite,
        isAdding,
        isRemoving,
    };
};
