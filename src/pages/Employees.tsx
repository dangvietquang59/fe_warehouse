import { useUsers } from '@/queries/user-query';
import { RoleType, UserType } from '@/types/user-type';
import { useTranslationCustom } from '@/utils/hooks/useTranslationCustom';
import { Table, Tag } from 'antd';

function Employees() {
    const { data: users, isLoading } = useUsers();
    const { t } = useTranslationCustom();
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
            render: (role: RoleType) => (
                <Tag color={role.name === 'admin' ? 'blue' : 'green'}>{role.name}</Tag>
            ),
        },
    ];
    return (
        <div className="flex flex-col gap-[20px] bg-white p-[20px] rounded-[10px]">
            <h1 className="text-2xl font-bold">{t.user.listEmployee}</h1>
            <Table
                columns={columns}
                dataSource={users?.data}
                loading={isLoading}
                rowKey={record => record.id}
            />
        </div>
    );
}

export default Employees;
