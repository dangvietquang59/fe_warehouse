export type BaseDataType<T> = {
    status: number;
    message: string;
    data: T[];
    total: number;
    page: number;
    limit: number;
};
