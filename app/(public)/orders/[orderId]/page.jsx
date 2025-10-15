'use client'
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeftIcon, MapPinIcon, CreditCardIcon, CalendarIcon, PhoneIcon } from 'lucide-react';
import OrderStatusFlow from '@/components/OrderStatusFlow';
import Image from 'next/image';
import { orderDummyData } from '@/assets/assets';

const OrderDetailPage = () => {
    const params = useParams();
    const router = useRouter();
    const { orderId } = params;
    
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$';

    useEffect(() => {
        const fetchOrderDetails = async () => {
            setLoading(true);
            try {
                // Simulate API call - replace with actual API
                const foundOrder = orderDummyData.find(o => o.id === orderId);
                if (foundOrder) {
                    setOrder(foundOrder);
                } else {
                    // Create a demo order if not found
                    setOrder({
                        id: orderId,
                        total: 289.99,
                        status: 'PROCESSING',
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString(),
                        paymentMethod: 'COD',
                        isPaid: false,
                        orderItems: [
                            {
                                quantity: 1,
                                price: 289.99,
                                product: {
                                    id: 'demo_1',
                                    name: 'Wireless Bluetooth Headphones',
                                    images: ['/api/placeholder/400/400'],
                                    category: 'Electronics'
                                }
                            }
                        ],
                        address: {
                            name: 'Tohid Bangladesh',
                            street: '123 Demo Street',
                            city: 'Dhaka',
                            state: 'Dhaka',
                            zip: '10001',
                            country: 'Bangladesh',
                            phone: '01794985731'
                        },
                        user: {
                            name: 'Demo User',
                            email: 'demo@example.com'
                        }
                    });
                }
            } catch (error) {
                console.error('Error fetching order:', error);
            } finally {
                setLoading(false);
            }
        };

        if (orderId) {
            fetchOrderDetails();
        }
    }, [orderId]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-slate-700"></div>
            </div>
        );
    }

    if (!order) {
        return (
            <div className="min-h-screen flex items-center justify-center text-center">
                <div>
                    <h1 className="text-4xl font-bold text-slate-800 mb-4">Order Not Found</h1>
                    <p className="text-slate-600 mb-8">The order you're looking for doesn't exist.</p>
                    <button 
                        onClick={() => router.push('/orders')}
                        className="bg-slate-700 text-white px-6 py-2 rounded-lg hover:bg-slate-800 transition-colors"
                    >
                        Back to Orders
                    </button>
                </div>
            </div>
        );
    }

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-6xl mx-auto px-6">
                {/* Header */}
                <div className="bg-white rounded-lg shadow-sm mb-6 p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => router.push('/orders')}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <ArrowLeftIcon size={20} />
                            </button>
                            <div>
                                <h1 className="text-2xl font-bold text-slate-800">
                                    Order Details
                                </h1>
                                <p className="text-slate-600">
                                    Order ID: #{order.id.slice(-8)}
                                </p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-2xl font-bold text-slate-800">
                                {currency}{order.total.toFixed(2)}
                            </p>
                            <p className="text-slate-500">
                                {formatDate(order.createdAt)}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Order Status Tracking */}
                <div className="bg-white rounded-lg shadow-sm mb-6 p-6">
                    <h2 className="text-xl font-semibold text-slate-800 mb-6">
                        Order Tracking
                    </h2>
                    <OrderStatusFlow 
                        currentStatus={order.status} 
                        orderId={order.id}
                        showDetails={true}
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Order Items */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <h2 className="text-xl font-semibold text-slate-800 mb-6">
                                Order Items ({order.orderItems.length})
                            </h2>
                            <div className="space-y-4">
                                {order.orderItems.map((item, index) => (
                                    <div key={index} className="flex items-center gap-4 p-4 border border-slate-200 rounded-lg">
                                        <div className="w-20 h-20 bg-slate-100 rounded-lg flex items-center justify-center overflow-hidden">
                                            <Image
                                                src={item.product.images[0] || '/api/placeholder/80/80'}
                                                alt={item.product.name}
                                                width={80}
                                                height={80}
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-medium text-slate-800">
                                                {item.product.name}
                                            </h3>
                                            <p className="text-slate-500 text-sm">
                                                Category: {item.product.category}
                                            </p>
                                            <p className="text-slate-600 mt-1">
                                                Quantity: {item.quantity}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-semibold text-slate-800">
                                                {currency}{item.price.toFixed(2)}
                                            </p>
                                            <p className="text-slate-500 text-sm">
                                                Each: {currency}{(item.price / item.quantity).toFixed(2)}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Order Information */}
                    <div className="space-y-6">
                        {/* Delivery Address */}
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <MapPinIcon size={20} className="text-slate-600" />
                                <h3 className="font-semibold text-slate-800">
                                    Delivery Address
                                </h3>
                            </div>
                            <div className="text-slate-600 space-y-1">
                                <p className="font-medium">{order.address.name}</p>
                                <p>{order.address.street}</p>
                                <p>{order.address.city}, {order.address.state} {order.address.zip}</p>
                                <p>{order.address.country}</p>
                                <div className="flex items-center gap-1 mt-2 pt-2 border-t border-slate-200">
                                    <PhoneIcon size={16} />
                                    <p>{order.address.phone}</p>
                                </div>
                            </div>
                        </div>

                        {/* Payment Information */}
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <CreditCardIcon size={20} className="text-slate-600" />
                                <h3 className="font-semibold text-slate-800">
                                    Payment Information
                                </h3>
                            </div>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-slate-600">Payment Method:</span>
                                    <span className="font-medium">
                                        {order.paymentMethod === 'COD' ? 'Cash on Delivery' : 'Stripe Payment'}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-600">Payment Status:</span>
                                    <span className={`font-medium ${
                                        order.isPaid ? 'text-green-600' : 'text-orange-600'
                                    }`}>
                                        {order.isPaid ? 'Paid' : 'Pending'}
                                    </span>
                                </div>
                                <div className="pt-2 border-t border-slate-200">
                                    <div className="flex justify-between text-lg font-semibold">
                                        <span>Total:</span>
                                        <span>{currency}{order.total.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Order Timeline */}
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <CalendarIcon size={20} className="text-slate-600" />
                                <h3 className="font-semibold text-slate-800">
                                    Order Timeline
                                </h3>
                            </div>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-slate-600">Order Placed:</span>
                                    <span>{formatDate(order.createdAt)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-600">Last Updated:</span>
                                    <span>{formatDate(order.updatedAt)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-600">Estimated Delivery:</span>
                                    <span className="text-blue-600 font-medium">
                                        {new Date(new Date(order.createdAt).getTime() + 7 * 24 * 60 * 60 * 1000)
                                            .toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Need Help */}
                        <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
                            <h3 className="font-semibold text-slate-800 mb-3">
                                Need Help?
                            </h3>
                            <p className="text-slate-600 text-sm mb-4">
                                If you have any questions about your order, feel free to contact us.
                            </p>
                            <div className="space-y-2">
                                <button className="w-full text-left text-blue-600 hover:text-blue-800 text-sm font-medium">
                                    📞 Call Customer Service
                                </button>
                                <button className="w-full text-left text-blue-600 hover:text-blue-800 text-sm font-medium">
                                    💬 Start Live Chat
                                </button>
                                <button className="w-full text-left text-blue-600 hover:text-blue-800 text-sm font-medium">
                                    📧 Send Email
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetailPage;