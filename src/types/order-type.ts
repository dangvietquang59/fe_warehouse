import { ProductType } from './product-type';
import { SupplierType } from './supplier-type';
import { UserType } from './user-type';

export type OrderStatus = 'pending' | 'approved' | 'rejected' | 'completed';
export type OrderType = 'purchase' | 'sales';

export type BaseOrderType = {
    id: number;
    order_number: string;
    order_date: string;
    delivery_date: string | null;
    employee: UserType;
    status: OrderStatus;
    total_amount: number;
    notes: string | null;
    type: OrderType;
};

export type PurchaseOrderType = BaseOrderType & {
    supplier: SupplierType;
    type: 'purchase';
};

export type SalesOrderType = BaseOrderType & {
    customer_name: string;
    customer_phone: string;
    customer_email: string;
    customer_address: string;
    type: 'sales';
};

export type OrderItemType = {
    id: number;
    order_id: number;
    product: ProductType;
    quantity: number;
    unit_price: number;
};

export type CreateOrderItemType = {
    product_id: number;
    quantity: number;
    unit_price: number;
};

export type CreateBaseOrderType = {
    delivery_date: string | null;
    notes: string | null;
    items: CreateOrderItemType[];
};

export type CreatePurchaseOrderType = CreateBaseOrderType & {
    supplier_id: number;
    employee_id: number;
};

export type CreateSalesOrderType = CreateBaseOrderType & {
    employee_id: number;
    customer_name: string;
    customer_phone: string;
    customer_email: string;
    customer_address: string;
};
