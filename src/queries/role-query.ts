import roleApis from '@/apis/roleApis';
import { useQuery } from '@tanstack/react-query';

export type RoleParams = {
    page?: number;
};

export const useRoles = (params?: RoleParams) => {
    return useQuery({
        queryKey: ['roles', params],
        queryFn: () => roleApis.getRoles(params),
    });
};
