import InputComponent from '@/components/common/InputComponent';
import { useForm } from 'react-hook-form';
import { Button, Image } from 'antd';
import images from '@/assets/images';
import authApis from '@/apis/authApis';
import { Link } from 'react-router-dom';
import paths from '@/utils/constants/paths';
import { toast } from 'react-hot-toast';
import { RegisterType } from '@/types/auth-type';
import { useTranslationCustom } from '@/utils/hooks/useTranslationCustom';
const Logup = () => {
    const { control, handleSubmit } = useForm<RegisterType>();
    const { t } = useTranslationCustom();
    const onSubmit = async (data: RegisterType) => {
        console.log(data);
        if (data.password !== data.confirmPassword) {
            toast.error(t.auth.passwordNotMatch);
            return;
        }
        const new_data = {
            email: data.email,
            username: data.username,
            full_name: data.fullname,
            password: data.password,
        };
        await authApis
            .signUp(new_data)
            .then(res => {
                console.log(res);
                toast.success(t.auth.registerSuccess);
            })
            .catch(err => {
                console.log(err);
                toast.error(t.auth.registerFailed);
            });
    };
    return (
        <div className="h-screen flex items-center justify-center bg-gray-100">
            <div className="rounded-[10px] shadow-md w-[500px] min-h-[700px] p-[20px] bg-white flex flex-col gap-[20px]">
                <div className="flex items-center justify-center">
                    {' '}
                    <Image
                        src={images.logo}
                        alt="logo"
                        width={100}
                        height={100}
                        preview={false}
                        className="rounded-full"
                    />
                </div>
                <h1 className="text-2xl font-bold text-center">
                    {t.auth.register} {t.auth.title}
                </h1>
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

                    <div className="flex items-center justify-center gap-[10px]">
                        <span>{t.auth.haveAccount}</span>
                        <Link to={paths.login} className="text-blue-500">
                            {t.auth.login}
                        </Link>
                    </div>
                    <Button type="primary" htmlType="submit" className="h-[40px]">
                        {t.auth.register}
                    </Button>
                </form>
            </div>
        </div>
    );
};
export default Logup;
