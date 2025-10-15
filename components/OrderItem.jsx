'use client'
import Image from "next/image";
import { DotIcon, EyeIcon, ArrowRightIcon } from "lucide-react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Rating from "./Rating";
import { useState } from "react";
import RatingModal from "./RatingModal";
import OrderStatusFlow from "./OrderStatusFlow";

const OrderItem = ({ order }) => {

    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$';
    const [ratingModal, setRatingModal] = useState(null);
    const [showOrderFlow, setShowOrderFlow] = useState(false);
    const router = useRouter();

    const { ratings } = useSelector(state => state.rating);

    return (
        <>
            <tr className="text-sm">
                <td className="text-left">
                    <div className="flex flex-col gap-6">
                        {order.orderItems.map((item, index) => (
                            <div key={index} className="flex items-center gap-4">
                                <div className="w-20 aspect-square bg-slate-100 flex items-center justify-center rounded-md">
                                    <Image
                                        className="h-14 w-auto"
                                        src={item.product.images[0]}
                                        alt="product_img"
                                        width={50}
                                        height={50}
                                    />
                                </div>
                                <div className="flex flex-col justify-center text-sm">
                                    <p className="font-medium text-slate-600 text-base">{item.product.name}</p>
                                    <p>{currency}{item.price} Qty : {item.quantity} </p>
                                    <p className="mb-1">{new Date(order.createdAt).toDateString()}</p>
                                    <div>
                                        {ratings.find(rating => order.id === rating.orderId && item.product.id === rating.productId)
                                            ? <Rating value={ratings.find(rating => order.id === rating.orderId && item.product.id === rating.productId).rating} />
                                            : <button onClick={() => setRatingModal({ orderId: order.id, productId: item.product.id })} className={`text-green-500 hover:bg-green-50 transition ${order.status !== "DELIVERED" && 'hidden'}`}>Rate Product</button>
                                        }</div>
                                    {ratingModal && <RatingModal ratingModal={ratingModal} setRatingModal={setRatingModal} />}
                                </div>
                            </div>
                        ))}
                    </div>
                </td>

                <td className="text-center max-md:hidden">{currency}{order.total}</td>

                <td className="text-left max-md:hidden">
                    <p>{order.address.name}, {order.address.street},</p>
                    <p>{order.address.city}, {order.address.state}, {order.address.zip}, {order.address.country},</p>
                    <p>{order.address.phone}</p>
                </td>
                <td className="text-left space-y-2 text-sm max-md:hidden">
                    <div className="space-y-2">
                        <div
                            className={`flex items-center justify-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${
                                order.status === 'ORDER_PLACED'
                                    ? 'text-blue-600 bg-blue-100'
                                    : order.status === 'PROCESSING'
                                        ? 'text-yellow-600 bg-yellow-100'
                                        : order.status === 'PACKAGED'
                                            ? 'text-purple-600 bg-purple-100'
                                            : order.status === 'SHIPPED'
                                                ? 'text-orange-600 bg-orange-100'
                                                : order.status === 'OUT_FOR_DELIVERY'
                                                    ? 'text-yellow-700 bg-yellow-100'
                                                    : order.status === 'DELIVERED'
                                                        ? 'text-green-600 bg-green-100'
                                                        : 'text-slate-500 bg-slate-100'
                            }`}
                        >
                            <DotIcon size={10} className="scale-250" />
                            {order.status.split('_').join(' ').toLowerCase()}
                        </div>
                        <div className="flex gap-1">
                            <button
                                onClick={() => setShowOrderFlow(!showOrderFlow)}
                                className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                            >
                                {showOrderFlow ? 'Hide' : 'Track'}
                            </button>
                            <span className="text-slate-300">|</span>
                            <button
                                onClick={() => router.push(`/orders/${order.id}`)}
                                className="text-xs text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
                            >
                                <EyeIcon size={12} />
                                Details
                            </button>
                        </div>
                    </div>
                </td>
            </tr>
            {/* Mobile */}
            <tr className="md:hidden">
                <td colSpan={5}>
                    <div className="space-y-3">
                        <div>
                            <p className="font-medium">{order.address.name}</p>
                            <p className="text-sm text-slate-600">{order.address.street}</p>
                            <p className="text-sm text-slate-600">{order.address.city}, {order.address.state}, {order.address.zip}</p>
                            <p className="text-sm text-slate-600">{order.address.country}</p>
                            <p className="text-sm text-slate-600">📞 {order.address.phone}</p>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                order.status === 'ORDER_PLACED'
                                    ? 'text-blue-600 bg-blue-100'
                                    : order.status === 'PROCESSING'
                                        ? 'text-yellow-600 bg-yellow-100'
                                        : order.status === 'PACKAGED'
                                            ? 'text-purple-600 bg-purple-100'
                                            : order.status === 'SHIPPED'
                                                ? 'text-orange-600 bg-orange-100'
                                                : order.status === 'OUT_FOR_DELIVERY'
                                                    ? 'text-yellow-700 bg-yellow-100'
                                                    : order.status === 'DELIVERED'
                                                        ? 'text-green-600 bg-green-100'
                                                        : 'text-slate-500 bg-slate-100'
                            }`}>
                                {order.status.replace(/_/g, ' ').toLowerCase()}
                            </span>
                            <button
                                onClick={() => router.push(`/orders/${order.id}`)}
                                className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium"
                            >
                                View Details
                                <ArrowRightIcon size={14} />
                            </button>
                        </div>
                        <button
                            onClick={() => setShowOrderFlow(!showOrderFlow)}
                            className="w-full text-center text-blue-600 hover:text-blue-800 text-sm font-medium border border-blue-200 rounded-lg py-2"
                        >
                            {showOrderFlow ? 'Hide Order Tracking' : 'Track Order Progress'}
                        </button>
                    </div>
                </td>
            </tr>
            {/* Order Tracking Flow */}
            {showOrderFlow && (
                <tr>
                    <td colSpan={4} className="px-4 py-6 bg-slate-50">
                        <div className="max-w-4xl mx-auto">
                            <h4 className="font-medium text-slate-800 mb-4">Order Progress</h4>
                            <OrderStatusFlow 
                                currentStatus={order.status} 
                                orderId={order.id}
                                showDetails={false}
                            />
                        </div>
                    </td>
                </tr>
            )}
            <tr>
                <td colSpan={4}>
                    <div className="border-b border-slate-300 w-full mx-auto" />
                </td>
            </tr>
        </>
    )
}

export default OrderItem