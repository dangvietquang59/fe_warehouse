import { useActivitiesLogs } from '@/queries/activity-query';
import { ActivitiesLogType } from '@/types/activity-type';
import dayjs from 'dayjs';

const Dashboard = () => {
    const { data: activitiesLogs, isLoading: isActivitiesLogsLoading } = useActivitiesLogs();

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold mb-6">📦 Warehouse Dashboard</h1>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <SummaryCard title="Total Products" value="1,240" icon="📦" />
                <SummaryCard title="Suppliers" value="48" icon="🏭" />
                <SummaryCard title="Low Stock Items" value="12" icon="⚠️" />
                <SummaryCard title="Recent Orders" value="76" icon="🧾" />
            </div>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Activities Log */}
                <div className="bg-white rounded-xl p-5 shadow-sm">
                    <h2 className="text-xl font-semibold mb-4">📝 Activities Log</h2>
                    <div className="flex flex-col gap-4 max-h-[350px] overflow-y-auto pr-2">
                        {isActivitiesLogsLoading ? (
                            <div className="flex justify-center items-center h-20">
                                <div className="w-8 h-8 border-4 border-t-transparent border-gray-400 rounded-full animate-spin" />
                            </div>
                        ) : (
                            activitiesLogs?.data.map((log: ActivitiesLogType) => (
                                <div
                                    key={log.id}
                                    className="bg-gray-50 border border-gray-200 p-4 rounded-lg"
                                >
                                    <div className="grid grid-cols-2 text-sm text-gray-700 gap-2 mb-2">
                                        <div>
                                            <span className="font-semibold">Action:</span>{' '}
                                            {log.action}
                                        </div>
                                        <div>
                                            <span className="font-semibold">Table:</span>{' '}
                                            {log.table_name}
                                        </div>
                                        <div>
                                            <span className="font-semibold">Record ID:</span>{' '}
                                            {log.record_id}
                                        </div>
                                        <div className="italic text-gray-500">
                                            <span className="font-semibold">Time:</span>{' '}
                                            {dayjs(log.created_at).format('YYYY-MM-DD HH:mm')}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2 text-xs">
                                        <div className="bg-red-100 p-2 rounded-lg whitespace-pre-wrap">
                                            <div className="font-semibold text-red-600 mb-1">
                                                Old Values
                                            </div>
                                            <code className="text-red-700 break-words">
                                                {JSON.stringify(log.old_values, null, 2)}
                                            </code>
                                        </div>
                                        <div className="bg-green-100 p-2 rounded-lg whitespace-pre-wrap">
                                            <div className="font-semibold text-green-600 mb-1">
                                                New Values
                                            </div>
                                            <code className="text-green-700 break-words">
                                                {JSON.stringify(log.new_values, null, 2)}
                                            </code>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Chart Placeholder */}
                <div className="bg-white rounded-xl p-5 shadow-sm flex flex-col justify-center items-center h-[400px]">
                    <h2 className="text-xl font-semibold mb-4">📊 Stock Trends</h2>
                    <p className="text-gray-400">[Insert Chart Here - E.g., Recharts / Chart.js]</p>
                </div>
            </div>
        </div>
    );
};

const SummaryCard = ({ title, value, icon }: { title: string; value: string; icon: string }) => (
    <div className="bg-white p-5 rounded-xl shadow-sm flex items-center gap-4">
        <div className="text-3xl">{icon}</div>
        <div>
            <div className="text-sm text-gray-500">{title}</div>
            <div className="text-xl font-bold">{value}</div>
        </div>
    </div>
);

export default Dashboard;
