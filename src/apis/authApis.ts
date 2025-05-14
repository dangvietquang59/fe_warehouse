import axiosInstance from '@/lib/axiosInstance';
import urls from '@/utils/constants/urls';
const authApis = {
    signUp: async (data: any) => {
        const response = await axiosInstance.post(`${urls.auth}/${urls.register}`, data);
        return response.data;
    },
    login: async (data: any) => {
        const response = await axiosInstance.post(`${urls.auth}/${urls.login}`, data);
        return response.data;
    },
};
export default authApis;
