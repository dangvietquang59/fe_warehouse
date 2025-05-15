import { useUsers } from '@/queries/user-query';
import { RoleType, UserType } from '@/types/user-type';
import { useTranslationCustom } from '@/utils/hooks/useTranslationCustom';
import { Button, Modal, Table, Tag } from 'antd';
import { Plus } from 'lucide-react';
import { useState } from 'react';

function Employees() {
    const { data: users, isLoading } = useUsers();
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
                    loading={isLoading}
                    rowKey={record => record.id}
                />
            </div>
            <Modal
                title={t.user.addEmployee}
                open={isModalOpen}
                onCancel={handleCloseModal}
                footer={null}
                centered
                width={1200}
                height={1200}
            >
                <div className="flex items-center justify-center">
                    <iframe
                        src="https://fe-warehouse-chi.vercel.app/auth/sign-up"
                        className="w-[1000px] h-[1000px]"
                    />
                </div>
            </Modal>
        </>
    );
}

export default Employees;
