import { Button, Spin, Alert, Table, Input } from 'antd';
import { useProducts } from '@/queries/product-query';
import { ProductType } from '@/types/product-type';
import { Plus } from 'lucide-react';
function Products() {
    const { data, isLoading, error } = useProducts();
    const columns = [
        {
            title: 'STT',
            key: 'index',
            render: (_: any, __: ProductType, index: number) => index + 1,
        },
        {
            title: 'Tên sản phẩm',
            dataIndex: 'name',
        },
        {
            title: 'Mã sản phẩm',
            dataIndex: 'SKU',
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            render: (price: number) =>
                price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }),
            sorter: (a: ProductType, b: ProductType) => a.price - b.price,
        },
        {
            title: 'Đơn vị',
            dataIndex: 'unit',
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            render: (quantity: number) => quantity.toLocaleString(),
            sorter: (a: ProductType, b: ProductType) => a.quantity - b.quantity,
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
                    <Button onClick={() => window.location.reload()}>Thử lại</Button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-[20px] bg-white p-[20px] rounded-[10px]">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Danh sách sản phẩm</h1>
                <div className="flex items-center gap-[10px]">
                    <Input placeholder="Tìm kiếm" className="h-[40px]" />
                    <Button
                        className="h-[40px] flex items-center gap-[10px]"
                        color="geekblue"
                        variant="solid"
                    >
                        <Plus />
                        Thêm sản phẩm
                    </Button>
                </div>
            </div>
            <Table dataSource={data?.data} columns={columns} />
        </div>
    );
}

export default Products;
