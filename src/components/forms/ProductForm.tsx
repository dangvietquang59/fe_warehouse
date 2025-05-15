import InputComponent from '../common/InputComponent';
import SelectComponent from '../common/SelectComponent';
import { useForm } from 'react-hook-form';
import TextAreaComponent from '../common/TextAreaComponent';
import { Button } from 'antd';
import { useTranslationCustom } from '@/utils/hooks/useTranslationCustom';
import { createProductType } from '@/types/product-type';
interface ProductFormProps {
    handleCloseModal: () => void;
}
function ProductForm({ handleCloseModal }: ProductFormProps) {
    const { control, handleSubmit } = useForm<createProductType>();
    const { t } = useTranslationCustom();
    const onSubmit = (data: createProductType) => {
        console.log(data);
        handleCloseModal();
    };
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-[10px]">
                    <InputComponent
                        label={t.product.name}
                        name="name"
                        placeholder={t.product.name}
                        control={control}
                    />

                    <InputComponent
                        label={t.product.price}
                        name="price"
                        placeholder={t.product.price}
                        control={control}
                    />
                    <InputComponent
                        label={t.product.unit}
                        name="unit"
                        placeholder={t.product.unit}
                        control={control}
                    />
                    <SelectComponent
                        label={t.product.category}
                        name="category_id"
                        placeholder={t.product.category}
                        control={control}
                        options={[]}
                    />
                    <TextAreaComponent
                        label={t.product.description}
                        name="description"
                        placeholder={t.product.description}
                        control={control}
                    />
                    <Button
                        htmlType="submit"
                        className="text-white h-[40px]"
                        variant="solid"
                        color="default"
                    >
                        {t.common.add}
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default ProductForm;
