import InputComponent from '@/components/common/InputComponent';
import { useForm } from 'react-hook-form';
import { Button } from 'antd';

import { toast } from 'react-hot-toast';
import { RegisterType } from '@/types/auth-type';
import { useTranslationCustom } from '@/utils/hooks/useTranslationCustom';
import { useEffect } from 'react';
import SelectComponent from '../common/SelectComponent';
import { useRoles } from '@/queries/role-query';
import { RoleType } from '@/types/user-type';
import { useCreateUser } from '@/queries/user-query';

type UserFormProps = {
    closeModal: () => void;
};
const UserForm = ({ closeModal }: UserFormProps) => {
    const { control, handleSubmit, setValue } = useForm<RegisterType>();
    const { t } = useTranslationCustom();
    const { data: roles } = useRoles();
    const { mutate: createUser } = useCreateUser({ closeModal });
    useEffect(() => {
        setValue('password', '123456');
        setValue('confirmPassword', '123456');
        setValue('role_id', 4);
    }, [setValue]);

    const onSubmit = async (data: RegisterType) => {
        if (data.password !== data.confirmPassword) {
            toast.error(t.auth.passwordNotMatch);
            return;
        }
        const new_data = {
            email: data.email,
            username: data.username,
            full_name: data.fullname,
            password: data.password,
            role_id: data.role_id,
        };
        createUser(new_data);
    };
    return (
        <div className="rounded-[10px] w-[500px] p-[20px] bg-white flex flex-col gap-[20px]">
            <form className="flex flex-col gap-[20px]" onSubmit={handleSubmit(onSubmit)}>
                <InputComponent
                    name="email"
                    type="email"
                    label={t.auth.email}
                    placeholder={t.auth.email}
                    control={control}
                    required
                />
                <InputComponent
                    name="fullname"
                    type="text"
                    label={t.auth.fullname}
                    placeholder={t.auth.fullname}
                    control={control}
                    required
                />
                <SelectComponent
                    name="role_id"
                    label={t.auth.role}
                    placeholder={t.auth.role}
                    control={control}
                    required
                    options={roles?.data.map((role: RoleType) => ({
                        label: role.name,
                        value: role.id,
                    }))}
                />
                <InputComponent
                    name="username"
                    type="text"
                    label={t.auth.username}
                    placeholder={t.auth.username}
                    control={control}
                    required
                />
                <InputComponent
                    name="password"
                    type="password"
                    label={t.auth.password}
                    placeholder={t.auth.password}
                    control={control}
                    required
                />
                <InputComponent
                    name="confirmPassword"
                    type="password"
                    label={t.auth.confirmPassword}
                    placeholder={t.auth.confirmPassword}
                    control={control}
                    required
                />

                <Button color="default" variant="solid" htmlType="submit" className="h-[40px]">
                    {t.auth.register}
                </Button>
            </form>
        </div>
    );
};
export default UserForm;
