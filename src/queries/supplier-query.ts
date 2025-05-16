import supplierApis from '@/apis/supplierApis';
import { BaseDataType } from '@/types/base-data';
import { SupplierType } from '@/types/supplier-type';
import { useQuery } from '@tanstack/react-query';

export type SupplierParams = {
    page?: number;
    query?: string;
};

export const useSuppliers = (params: SupplierParams) =>
    useQuery<BaseDataType<SupplierType>>({
        queryKey: ['suppliers', params],
        queryFn: () => supplierApis.getSuppliers(params),
    });
