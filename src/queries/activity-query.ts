import activitieslogApis from '@/apis/activitieslogApis';
import { useQuery } from '@tanstack/react-query';

export type ActivitiesLogParams = {
    page?: number;
};
export const useActivitiesLogs = (params?: ActivitiesLogParams) => {
    return useQuery({
        queryKey: ['activities-logs', params],
        queryFn: () => activitieslogApis.getActivitiesLogs(params),
    });
};
