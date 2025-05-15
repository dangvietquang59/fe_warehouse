export type ProductType = {
    id: number;
    SKU: string;
    name: string;
    price: number;
    unit: string;
    description: string;
    category: {
        id: number;
        name: string;
        description: string;
    };
    quantity: number;
};

export type createProductType = {
    name: string;
    price: number;
    unit: string;
    description: string;
    category_id: number;
};
