export type UserType = {
    id: number;
    username: string;
    card_number: string | null;
    email: string;
    full_name: string;
    role: RoleType;
};

export type RoleType = {
    id: number;
    name: string;
    description: string;
};
