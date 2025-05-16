import { CategoryType } from './category-type';

export type ProductType = {
    id: number;
    SKU: string;
    name: string;
    price: number;
    unit: string;
    description: string;
    category: CategoryType;
    quantity: number;
};

export type createProductType = {
    name: string;
    price: number;
    unit: string;
    description: string;
    category_id: number;
};
