import { Button, Spin, Alert, Table, Input, Modal, Tooltip } from 'antd';
import { CategoryParams, useCategories } from '@/queries/category-query';
import { CategoryType } from '@/types/category-type';
import { Pen, Plus, Trash } from 'lucide-react';
import { useState } from 'react';
import { useTranslationCustom } from '@/utils/hooks/useTranslationCustom';

function Categories() {
    const [params, setParams] = useState<CategoryParams>({ page: 1 });
    const { data: categories, isLoading, error } = useCategories(params);
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
            render: (_: any, __: CategoryType, index: number) => index + 1,
        },
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Description',
            dataIndex: 'description',
        },
        {
            title: t.common.edit || 'Actions',
            key: 'action',
            render: (_: any, __: CategoryType) => (
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
                    description={`Không thể lấy danh sách danh mục: ${(error as Error).message}`}
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
                    <h1 className="text-2xl font-bold">{t.page.categories}</h1>
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
                    dataSource={categories?.data}
                    columns={columns}
                    loading={isLoading}
                    rowKey={record => record.id}
                    pagination={{
                        current: params.page,
                        pageSize: 10,
                        total: categories?.total,
                        onChange: handlePageChange,
                    }}
                />
            </div>
            <Modal
                title={`${t.common.add} ${t.page.categories}`}
                open={isModalOpen}
                onCancel={handleCloseModal}
                footer={null}
                centered
            >
                {/* TODO: Add CategoryForm component */}
                <div className="p-4">
                    <Alert message="Category Form will be implemented here" type="info" />
                </div>
            </Modal>
        </>
    );
}

export default Categories;
