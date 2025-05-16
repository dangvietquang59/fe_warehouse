import { Button, Spin, Alert, Table, Input, Modal, Tag, Tooltip } from 'antd';
import { ProductParams, useProducts } from '@/queries/product-query';
import { ProductType } from '@/types/product-type';
import { Pen, Plus, Trash } from 'lucide-react';
import ProductForm from '@/components/forms/ProductForm';
import { useState } from 'react';
import { useTranslationCustom } from '@/utils/hooks/useTranslationCustom';
function Products() {
    const [params, setParams] = useState<ProductParams>({ page: 1 });

    const { data: products, isLoading, error } = useProducts(params);
    const handlePageChange = (page: number) => {
        setParams({ ...params, page });
    };
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { t } = useTranslationCustom();

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const columns = [
        {
            title: 'STT',
            key: 'index',
            render: (_: any, __: ProductType, index: number) => index + 1,
        },
        {
            title: t.product.name,
            dataIndex: 'name',
        },
        {
            title: t.product.code,
            dataIndex: 'SKU',
        },
        {
            title: t.product.category,
            dataIndex: 'category',
            render: (category: any) => <Tag color="purple">{category.name}</Tag>,
        },
        {
            title: t.product.price,
            dataIndex: 'price',
            render: (price: number) =>
                price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }),
            sorter: (a: ProductType, b: ProductType) => a.price - b.price,
        },
        {
            title: t.product.unit,
            dataIndex: 'unit',
        },
        {
            title: t.product.quantity,
            dataIndex: 'quantity',
            render: (quantity: number) => quantity.toLocaleString(),
            sorter: (a: ProductType, b: ProductType) => a.quantity - b.quantity,
        },
        {
            title: t.product.actions,
            key: 'action',
            render: (_: any, __: ProductType) => (
                <div className="flex items-center gap-2">
                    <Tooltip title={t.common.edit}>
                        <Button
                            type="text"
                            icon={<Pen width={16} height={16} />}
                            // onClick={() => handleEdit(__)}
                        />
                    </Tooltip>
                    <Tooltip title={t.common.delete}>
                        <Button
                            type="text"
                            icon={<Trash width={16} height={16} />}
                            danger
                            // onClick={() => handleDelete(__)}
                        />
                    </Tooltip>
                </div>
            ),
            width: 150,
        },
    ];
    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Spin size="large" tip="Đang tải dữ liệu..." />
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-4">
                <Alert
                    message="Lỗi tải dữ liệu"
                    description={`Không thể lấy danh sách sản phẩm: ${(error as Error).message}`}
                    type="error"
                    showIcon
                />
                <div className="mt-4">
                    <Button onClick={() => window.location.reload()}>{t.common.tryAgain}</Button>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="flex flex-col gap-[20px] bg-white p-[20px] rounded-[10px]">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">{t.product.listProduct}</h1>
                    <div className="flex items-center gap-[10px]">
                        <Input placeholder="Tìm kiếm" className="h-[40px]" />
                        <Button
                            onClick={handleOpenModal}
                            className="h-[40px] flex items-center gap-[10px]"
                            color="default"
                            variant="solid"
                        >
                            <Plus />
                            {t.product.addProduct}
                        </Button>
                    </div>
                </div>
                <Table
                    dataSource={products?.data}
                    columns={columns}
                    loading={isLoading}
                    rowKey={record => record.id}
                    pagination={{
                        current: params.page,
                        pageSize: 10,
                        total: products?.total,
                        onChange: handlePageChange,
                    }}
                />
            </div>
            <Modal
                title={t.product.addProduct}
                open={isModalOpen}
                onCancel={handleCloseModal}
                footer={null}
                centered
            >
                <ProductForm handleCloseModal={handleCloseModal} />
            </Modal>
        </>
    );
}

export default Products;
