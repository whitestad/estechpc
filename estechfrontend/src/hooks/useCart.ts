import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchCart, addProductToCart, updateCartItem, removeProductFromCart, clearCart } from '@api/cart';
import { ICart } from 'types/cart';

// Хук для работы с корзиной
export const useCart = () => {
    const queryClient = useQueryClient();

    // Запрос для получения корзины
    const {
        data: cart,
        isLoading: isLoadingCart,
        isError: isErrorCart,
    } = useQuery<ICart>({
        queryKey: ['cart'],
        queryFn: fetchCart,
    });

    // Мутация для добавления товара в корзину
    const addProductToCartMutation = useMutation({
        mutationFn: (variables: { productId: number; quantity: number }) => addProductToCart(variables.productId, variables.quantity),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cart'] });
        },
    });

    // Мутация для обновления количества товара в корзине
    const updateCartItemMutation = useMutation({
        mutationFn: (variables: { itemId: number; quantity: number }) => updateCartItem(variables.itemId, variables.quantity),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cart'] });
        },
    });

    // Мутация для удаления товара из корзины
    const removeProductFromCartMutation = useMutation({
        mutationFn: (itemId: number) => removeProductFromCart(itemId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cart'] });
        },
    });

    // Мутация для очистки корзины
    const clearCartMutation = useMutation({
        mutationFn: clearCart,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cart'] });
        },
    });

    return {
        cart,
        isLoadingCart,
        isErrorCart,
        addProductToCart: addProductToCartMutation.mutate,
        updateCartItem: updateCartItemMutation.mutate,
        removeProductFromCart: removeProductFromCartMutation.mutate,
        clearCart: clearCartMutation.mutate,
        isAdding: addProductToCartMutation.isPending,
        isUpdating: updateCartItemMutation.isPending,
        isRemoving: removeProductFromCartMutation.isPending,
        isClearing: clearCartMutation.isPending,
    };
};
