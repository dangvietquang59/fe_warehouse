import categoryApis from '@/apis/categoryApis';
import { useQuery } from '@tanstack/react-query';

export type CategoryParams = {
    page?: number;
};
export const useCategories = (params: CategoryParams) => {
    return useQuery({
        queryKey: ['categories', params],
        queryFn: () => categoryApis.getCategories(params),
    });
};
