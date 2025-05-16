import { Button, Spin, Alert, Table, Input, Modal, Tooltip, Tag } from 'antd';
import { OrderParams, useSalesOrders } from '@/queries/order-query';
import { OrderStatus, SalesOrderType } from '@/types/order-type';
import { Eye, Pen, Plus, Trash } from 'lucide-react';
import { useState } from 'react';
import { useTranslationCustom } from '@/utils/hooks/useTranslationCustom';
import dayjs from 'dayjs';

function SalesOrders() {
    const [params, setParams] = useState<OrderParams>({ page: 1 });
    const { data: orders, isLoading, error } = useSalesOrders(params);
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
            render: (_: any, __: SalesOrderType, index: number) => index + 1,
        },
        {
            title: 'Order Number',
            dataIndex: 'order_number',
        },
        {
            title: 'Order Date',
            dataIndex: 'order_date',
            render: (date: string) => (date ? dayjs(date).format('DD/MM/YYYY') : '-'),
        },
        {
            title: 'Customer',
            dataIndex: 'customer_name',
        },
        {
            title: 'Phone',
            dataIndex: 'customer_phone',
        },
        {
            title: 'Employee',
            dataIndex: 'employee',
            render: (employee: any) => employee?.full_name || '-',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            render: (status: OrderStatus) =>
                status ? <Tag color={getStatusColor(status)}>{status.toUpperCase()}</Tag> : '-',
        },
        {
            title: 'Total Amount',
            dataIndex: 'total_amount',
            render: (amount: number) =>
                amount
                    ? amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
                    : '0 ₫',
            sorter: (a: SalesOrderType, b: SalesOrderType) => a.total_amount - b.total_amount,
        },
        {
            title: t.common.edit || 'Actions',
            key: 'action',
            render: (_: any, _record: SalesOrderType) => (
                <div className="flex items-center gap-2">
                    <Tooltip title="View Details">
                        <Button
                            type="text"
                            icon={<Eye width={16} height={16} />}
                            // onClick={() => handleViewDetails(record.id)}
                        />
                    </Tooltip>
                    <Tooltip title={t.common.edit}>
                        <Button
                            type="text"
                            icon={<Pen width={16} height={16} />}
                            // onClick={() => handleEdit(record.id)}
                        />
                    </Tooltip>
                    <Tooltip title={t.common.delete}>
                        <Button
                            type="text"
                            icon={<Trash width={16} height={16} />}
                            danger
                            // onClick={() => handleDelete(record.id)}
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
                    description={`Không thể lấy danh sách đơn bán hàng: ${
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
                    <h1 className="text-2xl font-bold">Sales Orders</h1>
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
                title="Add Sales Order"
                open={isModalOpen}
                onCancel={handleCloseModal}
                footer={null}
                centered
                width={800}
            >
                {/* TODO: Add SalesOrderForm component */}
                <div className="p-4">
                    <Alert message="Sales Order Form will be implemented here" type="info" />
                </div>
            </Modal>
        </>
    );
}

export default SalesOrders;
