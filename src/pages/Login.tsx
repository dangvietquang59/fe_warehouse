import InputComponent from '@/components/common/InputComponent';
import { useForm } from 'react-hook-form';
import { Button, Image } from 'antd';
import images from '@/assets/images';
import authApis from '@/apis/authApis';
import paths from '@/utils/constants/paths';
import { toast } from 'react-hot-toast';
import { LoginType } from '@/types/auth-type';
import { useNavigate } from 'react-router-dom';
import { useTranslationCustom } from '@/utils/hooks/useTranslationCustom';
const Login = () => {
    const navigate = useNavigate();
    const { control, handleSubmit } = useForm<LoginType>();
    const { t } = useTranslationCustom();
    const onSubmit = async (data: LoginType) => {
        const new_data = {
            account: data.account,
            password: data.password,
        };
        await authApis
            .login(new_data)
            .then(res => {
                console.log(res);
                toast.success(t.auth.loginSuccess);
                localStorage.setItem('token', res.data.access_token);
                localStorage.setItem('user', JSON.stringify(res.data.user));
                navigate(paths.home);
            })
            .catch(err => {
                console.log(err);
                toast.error(t.auth.loginFailed);
            });
    };
    return (
        <div className="h-screen flex items-center justify-center bg-gray-100">
            <div className="rounded-[10px] shadow-md w-[500px] min-h-[500px] p-[20px] bg-white flex flex-col gap-[20px]">
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
                    {t.auth.login} {t.auth.title}
                </h1>
                <form className="flex flex-col gap-[20px]" onSubmit={handleSubmit(onSubmit)}>
                    <InputComponent
                        name="account"
                        type="text"
                        label={t.auth.account}
                        placeholder={t.auth.account}
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

                    <Button type="primary" htmlType="submit" className="h-[40px]">
                        {t.auth.login}
                    </Button>
                </form>
            </div>
        </div>
    );
};
export default Login;
