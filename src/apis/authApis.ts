import axiosInstance from "@/lib/axiosInstance";
import urls from "@/utils/constants/urls";  
const authApis = {
    signUp: async (data: any) => {
        const response = await axiosInstance.post(`${urls.AUTH}/${urls.REGISTER}`, data);
        return response.data;
    },
    login: async (data: any) => {
        const response = await axiosInstance.post(`${urls.AUTH}/${urls.LOGIN}`, data);
        return response.data;
    }
}
export default authApis;
