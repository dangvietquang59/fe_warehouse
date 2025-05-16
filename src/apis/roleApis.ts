import axiosInstance from '@/lib/axiosInstance';
import { RoleParams } from '@/queries/role-query';
import urls from '@/utils/constants/urls';

const roleApis = {
    getRoles: async (params?: RoleParams) => {
        try {
            const res = await axiosInstance.get(`${urls.roles}`, { params });
            return res.data;
        } catch (error) {
            throw error;
        }
    },
};

export default roleApis;
