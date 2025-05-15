import userApis from '@/apis/userApis';
import { BaseDataType } from '@/types/base-data';
import { UserType } from '@/types/user-type';
import { useQuery } from '@tanstack/react-query';

export const useUsers = () =>
    useQuery<BaseDataType<UserType>>({
        queryKey: ['users'],
        queryFn: userApis.getUsers,
    });
