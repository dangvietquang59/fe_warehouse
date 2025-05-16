import productApis from '@/apis/productApis';
import { BaseDataType } from '@/types/base-data';
import { ProductType } from '@/types/product-type';
import { useQuery } from '@tanstack/react-query';

export type ProductParams = {
    page?: number;
};
export const useProducts = (params: ProductParams) =>
    useQuery<BaseDataType<ProductType>>({
        queryKey: ['products', params],
        queryFn: () => productApis.getProducts(params),
    });
