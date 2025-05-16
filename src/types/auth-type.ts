export type RegisterType = {
    email: string;
    fullname: string;
    username: string;
    password: string;
    confirmPassword: string;
    role_id: number;
};

export type Create_RegisterTyppe = {
    email: string;
    full_name: string;
    username: string;
    password: string;
    role_id: number;
};

export type LoginType = {
    account: string;
    password: string;
};
