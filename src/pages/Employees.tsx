import UserForm from '@/components/forms/UserForm';
import { UserParams, useUsers } from '@/queries/user-query';
import { RoleType, UserType } from '@/types/user-type';
import { useTranslationCustom } from '@/utils/hooks/useTranslationCustom';
import { Button, Modal, Table, Tag } from 'antd';
import { Plus } from 'lucide-react';
import { useState } from 'react';

function Employees() {
    const [params, setParams] = useState<UserParams>({ page: 1 });
    const { data: users, isLoading: isLoadingUsers } = useUsers(params);

    const handlePageChange = (page: number) => {
        setParams({ ...params, page });
    };

    const { t } = useTranslationCustom();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    const handleOpenModal = () => {
        setIsModalOpen(true);
    };
    const mappingRole: Record<string, string> = {
        admin: 'blue',
        warehouse_manager: 'green',
        stock_keeper: 'yellow',
        viewer: 'purple',
        purchase: 'orange',
        auditor: 'red',
    };

    const columns = [
        {
            title: 'STT',
            key: 'index',
            render: (_: any, __: UserType, index: number) => index + 1,
        },
        {
            title: t.user.cardNumber,
            dataIndex: 'card_number',
            key: 'card_number',
            render: (card_number: string | null) => card_number || '-',
        },
        {
            title: t.user.fullName,
            dataIndex: 'full_name',
            key: 'full_name',
        },
        {
            title: t.user.email,
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: t.user.username,
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: t.user.role,
            dataIndex: 'role',
            render: (role: RoleType) => <Tag color={mappingRole[role.name]}>{role.name}</Tag>,
        },
    ];
    return (
        <>
            <div className="flex flex-col gap-[20px] bg-white p-[20px] rounded-[10px]">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">{t.user.listEmployee}</h1>
                    <Button
                        type="primary"
                        className="w-fit flex items-center gap-[10px] h-[40px]"
                        color="default"
                        variant="solid"
                        onClick={handleOpenModal}
                    >
                        <Plus />
                        {t.user.addEmployee}
                    </Button>
                </div>
                <Table
                    columns={columns}
                    dataSource={users?.data}
                    loading={isLoadingUsers}
                    rowKey={record => record.id}
                    pagination={{
                        current: params.page,
                        pageSize: 10,
                        total: users?.total,
                        onChange: handlePageChange,
                    }}
                />
            </div>
            <Modal
                title={t.user.addEmployee}
                open={isModalOpen}
                onCancel={handleCloseModal}
                footer={null}
                centered
            >
                <div className="flex items-center justify-center">
                    <UserForm closeModal={handleCloseModal} />
                </div>
            </Modal>
        </>
    );
}

export default Employees;
