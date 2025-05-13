import InputComponent from '@/components/common/InputComponent';
import { useForm } from 'react-hook-form';
import { Button, Image } from 'antd';
import images from '@/assets/images';
import authApis from '@/apis/authApis';
import { Link } from 'react-router-dom';
import paths from '@/utils/constants/paths';
import { toast } from 'react-hot-toast';
import { RegisterType } from '@/types/register-type';
const Logup = () => {
    const { control, handleSubmit } = useForm<RegisterType>();
    const onSubmit = async (data: RegisterType) => {
        console.log(data);
        if (data.password !== data.confirmPassword) {
            toast.error('Mật khẩu không khớp');
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
                toast.success('Đăng ký thành công');
            })
            .catch(err => {
                console.log(err);
                toast.error('Đăng ký thất bại');
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
                <h1 className="text-2xl font-bold text-center">Đăng ký tài khoản kho hàng</h1>
                <form className="flex flex-col gap-[20px]" onSubmit={handleSubmit(onSubmit)}>
                    <InputComponent
                        name="email"
                        type="email"
                        label="Email"
                        placeholder="Nhập email"
                        control={control}
                        required
                    />
                    <InputComponent
                        name="fullname"
                        type="text"
                        label="Họ tên"
                        placeholder="Nhập họ tên"
                        control={control}
                        required
                    />
                    <InputComponent
                        name="username"
                        type="text"
                        label="Tên tài khoản"
                        placeholder="Nhập tên tài khoản"
                        control={control}
                        required
                    />
                    <InputComponent
                        name="password"
                        type="password"
                        label="Mật khẩu"
                        placeholder="Nhập mật khẩu"
                        control={control}
                        required
                    />
                    <InputComponent
                        name="confirmPassword"
                        type="password"
                        label="Nhập lại mật khẩu"
                        placeholder="Nhập lại mật khẩu"
                        control={control}
                        required
                    />

                    <div className="flex items-center justify-center gap-[10px]">
                        <span>Đã có tài khoản?</span>
                        <Link to={paths.login} className="text-blue-500">
                            Đăng nhập
                        </Link>
                    </div>
                    <Button type="primary" htmlType="submit" className="h-[40px]">
                        Đăng ký
                    </Button>
                </form>
            </div>
        </div>
    );
};
export default Logup;
