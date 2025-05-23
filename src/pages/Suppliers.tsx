import { Button, Spin, Alert, Table, Input, Modal, Tooltip } from 'antd';
import { SupplierParams, useSuppliers } from '@/queries/supplier-query';
import { SupplierType } from '@/types/supplier-type';
import { Pen, Plus, Trash } from 'lucide-react';
import { useState } from 'react';
import { useTranslationCustom } from '@/utils/hooks/useTranslationCustom';

function Suppliers() {
    const [params, setParams] = useState<SupplierParams>({ page: 1 });
    const { data: suppliers, isLoading, error } = useSuppliers(params);
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

    const columns = [
        {
            title: 'STT',
            key: 'index',
            render: (_: any, __: SupplierType, index: number) => index + 1,
        },
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Address',
            dataIndex: 'address',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Contact Person',
            dataIndex: 'contact_person',
        },
        {
            title: t.common.edit || 'Actions',
            key: 'action',
            render: (_: any, __: SupplierType) => (
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
                    description={`Không thể lấy danh sách nhà cung cấp: ${
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

    return (
        <>
            <div className="flex flex-col gap-[20px] bg-white p-[20px] rounded-[10px]">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">{t.page.suppliers}</h1>
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
                    dataSource={suppliers?.data}
                    columns={columns}
                    loading={isLoading}
                    rowKey={record => record.id}
                    pagination={{
                        current: params.page,
                        pageSize: 10,
                        total: suppliers?.total,
                        onChange: handlePageChange,
                    }}
                />
            </div>
            <Modal
                title={`${t.common.add} ${t.page.suppliers}`}
                open={isModalOpen}
                onCancel={handleCloseModal}
                footer={null}
                centered
            >
                {/* TODO: Add SupplierForm component */}
                <div className="p-4">
                    <Alert message="Supplier Form will be implemented here" type="info" />
                </div>
            </Modal>
        </>
    );
}

export default Suppliers;
