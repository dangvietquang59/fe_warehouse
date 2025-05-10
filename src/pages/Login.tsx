import InputComponent from "@/components/common/InputComponent";
import { useForm } from "react-hook-form";
import { Button } from "antd";

const Login = () => {
    const { control } = useForm();
    return(
        <div className="h-screen flex items-center justify-center bg-gray-100">
            <div className="rounded-[10px] shadow-md w-[500px] h-[700px] p-[20px] bg-white">
                <h1 className="text-2xl font-bold text-center">Đăng nhập</h1>
                <form className="flex flex-col gap-[20px]">
                    <InputComponent name="email" type="email" label="Email" placeholder="Nhập email" control={control} required />
                    <InputComponent name="password" type="password" label="Mật khẩu" placeholder="Nhập mật khẩu" control={control} required />
                    <Button type="primary" htmlType="submit">Đăng nhập</Button>
                </form>
            </div>
        </div>
    )
};
export default Login;
