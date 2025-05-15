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
