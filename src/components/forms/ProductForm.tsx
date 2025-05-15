import InputComponent from '../common/InputComponent';
import SelectComponent from '../common/SelectComponent';
import { useForm } from 'react-hook-form';
import TextAreaComponent from '../common/TextAreaComponent';
import { Button } from 'antd';

interface ProductFormProps {
    handleCloseModal: () => void;
}
function ProductForm({ handleCloseModal }: ProductFormProps) {
    const { control, handleSubmit } = useForm();

    const onSubmit = (data: any) => {
        console.log(data);
        handleCloseModal();
    };
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-[10px]">
                    <InputComponent
                        label="Tên sản phẩm"
                        name="name"
                        placeholder="Nhập tên sản phẩm"
                        control={control}
                    />
                    <InputComponent
                        label="Mã sản phẩm"
                        name="sku"
                        placeholder="Nhập mã sản phẩm"
                        control={control}
                    />
                    <InputComponent
                        label="Giá"
                        name="price"
                        placeholder="Nhập giá"
                        control={control}
                    />
                    <InputComponent
                        label="Số lượng"
                        name="quantity"
                        placeholder="Nhập số lượng"
                        control={control}
                    />
                    <SelectComponent
                        label="Đơn vị"
                        name="unit"
                        placeholder="Chọn đơn vị"
                        control={control}
                        options={[]}
                    />
                    <TextAreaComponent
                        label="Mô tả"
                        name="description"
                        placeholder="Nhập mô tả"
                        control={control}
                    />
                    <Button htmlType="submit" className="bg-blue-500 text-white">
                        Thêm sản phẩm
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default ProductForm;
