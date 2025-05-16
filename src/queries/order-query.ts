import orderApis from '@/apis/orderApis';
import { BaseDataType } from '@/types/base-data';
import { PurchaseOrderType, SalesOrderType } from '@/types/order-type';
import { useQuery } from '@tanstack/react-query';

export type OrderParams = {
    page?: number;
    query?: string;
    status?: string;
    startDate?: string;
    endDate?: string;
};

// Purchase Order Queries
export const usePurchaseOrders = (params: OrderParams) =>
    useQuery<BaseDataType<PurchaseOrderType>>({
        queryKey: ['purchaseOrders', params],
        queryFn: () => orderApis.getPurchaseOrders(params),
    });

export const usePurchaseOrderById = (id: number) =>
    useQuery({
        queryKey: ['purchaseOrder', id],
        queryFn: () => orderApis.getPurchaseOrderById(id),
        enabled: !!id,
    });

// Sales Order Queries
export const useSalesOrders = (params: OrderParams) =>
    useQuery<BaseDataType<SalesOrderType>>({
        queryKey: ['salesOrders', params],
        queryFn: () => orderApis.getSalesOrders(params),
    });

export const useSalesOrderById = (id: number) =>
    useQuery({
        queryKey: ['salesOrder', id],
        queryFn: () => orderApis.getSalesOrderById(id),
        enabled: !!id,
    });
