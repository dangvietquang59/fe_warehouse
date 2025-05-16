import axiosInstance from '@/lib/axiosInstance';
import { CreatePurchaseOrderType, CreateSalesOrderType } from '@/types/order-type';
import urls from '@/utils/constants/urls';

interface OrderParams {
    page?: number;
    limit?: number;
    status?: string;
    startDate?: string;
    endDate?: string;
    query?: string;
}

const orderApis = {
    // Purchase Orders
    getPurchaseOrders: async (params: OrderParams) => {
        try {
            const response = await axiosInstance.get(`${urls.purchaseOrders}`, { params });
            return response.data;
        } catch (error) {
            console.error('Error fetching purchase orders:', error);
            throw error;
        }
    },

    getPurchaseOrderById: async (id: number) => {
        try {
            const response = await axiosInstance.get(`${urls.purchaseOrders}/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching purchase order with id ${id}:`, error);
            throw error;
        }
    },

    createPurchaseOrder: async (data: CreatePurchaseOrderType) => {
        try {
            const response = await axiosInstance.post(`${urls.purchaseOrders}`, data);
            return response.data;
        } catch (error) {
            console.error('Error creating purchase order:', error);
            throw error;
        }
    },

    updatePurchaseOrderStatus: async (id: number, status: string) => {
        try {
            const response = await axiosInstance.patch(`${urls.purchaseOrders}/${id}/status`, {
                status,
            });
            return response.data;
        } catch (error) {
            console.error(`Error updating purchase order status for id ${id}:`, error);
            throw error;
        }
    },

    deletePurchaseOrder: async (id: number) => {
        try {
            const response = await axiosInstance.delete(`${urls.purchaseOrders}/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error deleting purchase order with id ${id}:`, error);
            throw error;
        }
    },

    // Sales Orders
    getSalesOrders: async (params: OrderParams) => {
        try {
            const response = await axiosInstance.get(`${urls.salesOrders}`, { params });
            return response.data;
        } catch (error) {
            console.error('Error fetching sales orders:', error);
            throw error;
        }
    },

    getSalesOrderById: async (id: number) => {
        try {
            const response = await axiosInstance.get(`${urls.salesOrders}/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching sales order with id ${id}:`, error);
            throw error;
        }
    },

    createSalesOrder: async (data: CreateSalesOrderType) => {
        try {
            const response = await axiosInstance.post(`${urls.salesOrders}`, data);
            return response.data;
        } catch (error) {
            console.error('Error creating sales order:', error);
            throw error;
        }
    },

    updateSalesOrderStatus: async (id: number, status: string) => {
        try {
            const response = await axiosInstance.patch(`${urls.salesOrders}/${id}/status`, {
                status,
            });
            return response.data;
        } catch (error) {
            console.error(`Error updating sales order status for id ${id}:`, error);
            throw error;
        }
    },

    deleteSalesOrder: async (id: number) => {
        try {
            const response = await axiosInstance.delete(`${urls.salesOrders}/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error deleting sales order with id ${id}:`, error);
            throw error;
        }
    },
};

export default orderApis;
