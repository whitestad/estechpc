import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchOrders, createOrder } from 'src/api/orders';
import { IOrder, IOrderCreateData, PaginatedResponse } from 'src/types/order';

const ORDERS_QUERY_KEY = 'orders';

export const useOrders = () => {
    const queryClient = useQueryClient();

    // Получение списка заказов с пагинацией через useInfiniteQuery
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError, error } = useInfiniteQuery<PaginatedResponse<IOrder>, Error>({
        queryKey: [ORDERS_QUERY_KEY],
        queryFn: ({ pageParam = 1 }) => fetchOrders(typeof pageParam === 'number' ? pageParam : 1),
        getNextPageParam: (lastPage) => {
            const nextUrl = lastPage.next;
            if (nextUrl) {
                const urlParams = new URLSearchParams(nextUrl.split('?')[1]);
                return urlParams.get('page') ? parseInt(urlParams.get('page')!) : undefined;
            }
            return undefined;
        },
        initialPageParam: 1,
    });

    // Мутация для создания нового заказа
    const createOrderMutation = useMutation<IOrderCreateData, Error, IOrderCreateData>({
        mutationFn: createOrder,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [ORDERS_QUERY_KEY] });
        },
    });

    return {
        orders: data?.pages.flatMap((page) => page.results) || [],
        isLoading,
        isError,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        createOrder: createOrderMutation.mutateAsync,
    };
};
