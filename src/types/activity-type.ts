export type ActivitiesLogType = {
    id: number;
    user_id: string;
    action: string;
    table_name: string;
    record_id: string;
    old_values: JSON;
    new_values: JSON;
    created_at: string;
};
