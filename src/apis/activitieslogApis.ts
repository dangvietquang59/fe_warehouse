import axiosInstance from '@/lib/axiosInstance';
import { ActivitiesLogParams } from '@/queries/activity-query';
import urls from '@/utils/constants/urls';
const activitieslogApis = {
    getActivitiesLogs: async (params?: ActivitiesLogParams) => {
        try {
            const response = await axiosInstance.get(urls.activitiesLogs, {
                params,
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};

export default activitieslogApis;
