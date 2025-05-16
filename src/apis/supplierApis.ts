import axiosInstance from '@/lib/axiosInstance';
import { SupplierParams } from '@/queries/supplier-query';
import { CreateSupplierType } from '@/types/supplier-type';
import urls from '@/utils/constants/urls';

const supplierApis = {
    getSuppliers: async (params: SupplierParams) => {
        try {
            const response = await axiosInstance.get(`${urls.suppliers}`, { params });
            return response.data;
        } catch (error) {
            console.error('Error fetching suppliers:', error);
            throw error;
        }
    },

    createSupplier: async (data: CreateSupplierType) => {
        try {
            const response = await axiosInstance.post(`${urls.suppliers}`, data);
            return response.data;
        } catch (error) {
            console.error('Error creating supplier:', error);
            throw error;
        }
    },

    updateSupplier: async (id: number, data: CreateSupplierType) => {
        try {
            const response = await axiosInstance.put(`${urls.suppliers}/${id}`, data);
            return response.data;
        } catch (error) {
            console.error('Error updating supplier:', error);
            throw error;
        }
    },

    deleteSupplier: async (id: number) => {
        try {
            const response = await axiosInstance.delete(`${urls.suppliers}/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting supplier:', error);
            throw error;
        }
    },
};

export default supplierApis;
