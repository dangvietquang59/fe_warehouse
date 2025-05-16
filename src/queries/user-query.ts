import authApis from '@/apis/authApis';
import userApis from '@/apis/userApis';
import { queryClient } from '@/lib/queryClient';
import { Create_RegisterTyppe } from '@/types/auth-type';
import { BaseDataType } from '@/types/base-data';
import { UserType } from '@/types/user-type';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { useTranslationCustom } from '@/utils/hooks/useTranslationCustom';

export type UserParams = {
    page?: number;
    closeModal?: () => void;
};
export const useUsers = (params: UserParams) =>
    useQuery<BaseDataType<UserType>>({
        queryKey: ['users', params],
        queryFn: () => userApis.getUsers(params),
        placeholderData: previousData => previousData,
    });

export const useCreateUser = (params?: UserParams) => {
    const { t } = useTranslationCustom();
    return useMutation({
        mutationFn: (data: Create_RegisterTyppe) => authApis.signUp(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
            toast.success(t.auth.registerSuccess);
            params?.closeModal?.();
        },
        onError: error => {
            console.log(error);
            toast.error(t.auth.registerFailed);
        },
    });
};
