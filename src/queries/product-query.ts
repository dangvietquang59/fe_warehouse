import productApis from '@/apis/productApis';
import { BaseDataType } from '@/types/base-data';
import { ProductType } from '@/types/product-type';
import { useQuery } from '@tanstack/react-query';

export const useProducts = () =>
    useQuery<BaseDataType<ProductType>>({
        queryKey: ['products'],
        queryFn: productApis.getProducts,
    });
