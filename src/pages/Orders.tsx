import { Card, Row, Col, Button } from 'antd';
import { ShoppingCart, BookCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Orders() {
    const navigate = useNavigate();

    return (
        <div className="p-6 bg-white rounded-[10px]">
            <h1 className="text-2xl font-bold mb-8">Order Management</h1>

            <Row gutter={[24, 24]} className="mt-8">
                <Col xs={24} md={12}>
                    <Card hoverable className="h-full" onClick={() => navigate('/purchase-orders')}>
                        <div className="flex flex-col items-center py-8">
                            <div className="text-5xl mb-4 text-blue-500">
                                <ShoppingCart />
                            </div>
                            <h2 className="text-xl font-semibold mb-4">Purchase Orders</h2>
                            <p className="text-gray-500 text-center mb-8">
                                Manage all warehouse purchase orders with suppliers
                            </p>
                            <Button
                                type="primary"
                                size="large"
                                onClick={e => {
                                    e.stopPropagation();
                                    navigate('/purchase-orders');
                                }}
                            >
                                View Purchase Orders
                            </Button>
                        </div>
                    </Card>
                </Col>

                <Col xs={24} md={12}>
                    <Card hoverable className="h-full" onClick={() => navigate('/sales-orders')}>
                        <div className="flex flex-col items-center py-8">
                            <div className="text-5xl mb-4 text-green-500">
                                <BookCheck />
                            </div>
                            <h2 className="text-xl font-semibold mb-4">Sales Orders</h2>
                            <p className="text-gray-500 text-center mb-8">
                                Manage all customer sales orders and deliveries
                            </p>
                            <Button
                                type="primary"
                                size="large"
                                onClick={e => {
                                    e.stopPropagation();
                                    navigate('/sales-orders');
                                }}
                            >
                                View Sales Orders
                            </Button>
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default Orders;
