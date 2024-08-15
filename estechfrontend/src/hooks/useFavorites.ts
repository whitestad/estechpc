import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addToFavorites, removeFromFavorites } from '@api/favorites';

export const useFavorites = () => {
    const queryClient = useQueryClient();

    const addToFavoritesMutation = useMutation({
        mutationFn: addToFavorites,
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({
                queryKey: ['product', variables],
            });
            queryClient.invalidateQueries({
                queryKey: ['favorites'],
            });
        },
    });

    const removeFromFavoritesMutation = useMutation({
        mutationFn: removeFromFavorites,
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({
                queryKey: ['product', variables],
            });
            queryClient.invalidateQueries({
                queryKey: ['favorites'],
            });
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
