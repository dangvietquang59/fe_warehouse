import { Button, Spin, Alert, Table, Input, Modal, Tooltip, Tag } from 'antd';
import { OrderParams, usePurchaseOrders } from '@/queries/order-query';
import { OrderStatus, PurchaseOrderType } from '@/types/order-type';
import { Eye, Pen, Plus, Trash } from 'lucide-react';
import { useState } from 'react';
import { useTranslationCustom } from '@/utils/hooks/useTranslationCustom';
import dayjs from 'dayjs';

function PurchaseOrders() {
    const [params, setParams] = useState<OrderParams>({ page: 1 });
    const { data: orders, isLoading, error } = usePurchaseOrders(params);
    const { t } = useTranslationCustom();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handlePageChange = (page: number) => {
        setParams({ ...params, page });
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const getStatusColor = (status: OrderStatus) => {
        switch (status) {
            case 'pending':
                return 'orange';
            case 'approved':
                return 'blue';
            case 'rejected':
                return 'red';
            case 'completed':
                return 'green';
            default:
                return 'default';
        }
    };

    const columns = [
        {
            title: 'STT',
            key: 'index',
            render: (_: any, __: PurchaseOrderType, index: number) => index + 1,
        },
        {
            title: 'Order Number',
            dataIndex: 'order_number',
        },
        {
            title: 'Order Date',
            dataIndex: 'order_date',
            render: (date: string) => dayjs(date).format('DD/MM/YYYY'),
        },
        {
            title: 'Supplier',
            dataIndex: 'supplier',
            render: (supplier: any) => supplier?.name || '-',
        },
        {
            title: 'Employee',
            dataIndex: 'employee',
            render: (employee: any) => employee?.full_name || '-',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            render: (status: OrderStatus) => (
                <Tag color={getStatusColor(status)}>{status.toUpperCase()}</Tag>
            ),
        },
        {
            title: 'Total Amount',
            dataIndex: 'total_amount',
            render: (amount: number) =>
                amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }),
            sorter: (a: PurchaseOrderType, b: PurchaseOrderType) => a.total_amount - b.total_amount,
        },
        {
            title: t.common.edit || 'Actions',
            key: 'action',
            render: (_: any, __: PurchaseOrderType, _index: number) => (
                <div className="flex items-center gap-2">
                    <Tooltip title="View Details">
                        <Button
                            type="text"
                            icon={<Eye width={16} height={16} />}
                            // onClick={() => handleViewDetails(__.id)}
                        />
                    </Tooltip>
                    <Tooltip title={t.common.edit}>
                        <Button
                            type="text"
                            icon={<Pen width={16} height={16} />}
                            // onClick={() => handleEdit(__.id)}
                        />
                    </Tooltip>
                    <Tooltip title={t.common.delete}>
                        <Button
                            type="text"
                            icon={<Trash width={16} height={16} />}
                            danger
                            // onClick={() => handleDelete(__.id)}
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
                    description={`Không thể lấy danh sách đơn mua hàng: ${
                        (error as Error).message
                    }`}
                    type="error"
                    showIcon
                />
                <div className="mt-4">
                    <Button onClick={() => window.location.reload()}>{t.common.tryAgain}</Button>
                </div>
            </div>
        );
    }

    // Ensure data is always an array
    const orderData = Array.isArray(orders?.data) ? orders.data : [];
    const totalItems = orders?.total || 0;

    return (
        <>
            <div className="flex flex-col gap-[20px] bg-white p-[20px] rounded-[10px]">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Purchase Orders</h1>
                    <div className="flex items-center gap-[10px]">
                        <Input placeholder={t.common.search} className="h-[40px]" />
                        <Button
                            onClick={handleOpenModal}
                            className="h-[40px] flex items-center gap-[10px]"
                            color="default"
                            variant="solid"
                        >
                            <Plus />
                            {t.common.add}
                        </Button>
                    </div>
                </div>
                <Table
                    dataSource={orderData}
                    columns={columns}
                    loading={isLoading}
                    rowKey={record => record.id}
                    pagination={{
                        current: params.page,
                        pageSize: 10,
                        total: totalItems,
                        onChange: handlePageChange,
                    }}
                />
            </div>
            <Modal
                title="Add Purchase Order"
                open={isModalOpen}
                onCancel={handleCloseModal}
                footer={null}
                centered
                width={800}
            >
                {/* TODO: Add PurchaseOrderForm component */}
                <div className="p-4">
                    <Alert message="Purchase Order Form will be implemented here" type="info" />
                </div>
            </Modal>
        </>
    );
}

export default PurchaseOrders;
