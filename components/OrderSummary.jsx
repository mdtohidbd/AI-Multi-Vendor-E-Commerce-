import { PlusIcon, SquarePenIcon, XIcon, ChevronDownIcon, MapPinIcon, CreditCard, Truck, Shield, Gift, Sparkles, Zap, CheckCircle } from 'lucide-react';
import React, { useState, useEffect } from 'react'
import AddressModal from './AddressModal';
import { useSelector, useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { clearCart } from '@/lib/features/cart/cartSlice';
import { useUser } from '@clerk/nextjs';

const OrderSummary = ({ totalPrice, items }) => {

    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$';

    const router = useRouter();
    const dispatch = useDispatch();
    const { user } = useUser();

    const addressList = useSelector(state => state.address.list);

    const [paymentMethod, setPaymentMethod] = useState('COD');
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [showAddressModal, setShowAddressModal] = useState(false);
    const [couponCodeInput, setCouponCodeInput] = useState('');
    const [coupon, setCoupon] = useState('');
    const [showAddressDropdown, setShowAddressDropdown] = useState(false);
    const [isPlacingOrder, setIsPlacingOrder] = useState(false);

    // Auto-select first address if available
    useEffect(() => {
        if (addressList.length > 0 && !selectedAddress) {
            setSelectedAddress(addressList[0]);
        }
    }, [addressList, selectedAddress]);

    const handleCouponCode = async (event) => {
        event.preventDefault();
        if (!couponCodeInput.trim()) {
            toast.error('Please enter a coupon code');
            return;
        }
        
        // Simulate coupon validation
        const validCoupons = {
            'NEW20': { code: 'NEW20', discount: 20, description: '20% off for new users' },
            'SAVE10': { code: 'SAVE10', discount: 10, description: '10% off your order' },
            'WELCOME15': { code: 'WELCOME15', discount: 15, description: '15% welcome discount' }
        };

        const appliedCoupon = validCoupons[couponCodeInput.toUpperCase()];
        if (appliedCoupon) {
            setCoupon(appliedCoupon);
            toast.success('Coupon applied successfully!');
            setCouponCodeInput('');
        } else {
            toast.error('Invalid coupon code');
        }
    }

    const handlePlaceOrder = async (e) => {
        e.preventDefault();
        setIsPlacingOrder(true);

        if (!selectedAddress) {
            toast.error('Please select a delivery address');
            setIsPlacingOrder(false);
            return;
        }

        if (items.length === 0) {
            toast.error('Your cart is empty');
            setIsPlacingOrder(false);
            return;
        }

        if (!user) {
            toast.error('Please login to place order');
            setIsPlacingOrder(false);
            return;
        }

        try {
            // Get unique store IDs from cart items
            const storeIds = [...new Set(items.map(item => item.storeId))];
            
            // For now, handle single store orders
            // TODO: Support multi-store orders by creating separate orders per store
            if (storeIds.length > 1) {
                toast.error('Please order from one store at a time');
                setIsPlacingOrder(false);
                return;
            }

            const finalTotal = coupon ? (totalPrice - (coupon.discount / 100 * totalPrice)) : totalPrice;

            // Prepare order data for API
            const orderData = {
                userId: user.id,
                storeId: storeIds[0],
                addressId: selectedAddress.id,
                items: items.map(item => ({
                    productId: item.id,
                    quantity: item.quantity,
                    price: item.price
                })),
                total: finalTotal,
                paymentMethod: paymentMethod,
                isCouponUsed: !!coupon,
                coupon: coupon || null
            };

            // Call API to create order
            const response = await fetch('/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to place order');
            }
            
            // Clear cart after successful order
            dispatch(clearCart());
            
            toast.success('Order placed successfully!');
            router.push('/orders');
        } catch (error) {
            console.error('Order error:', error);
            toast.error(error.message || 'Failed to place order. Please try again.');
        } finally {
            setIsPlacingOrder(false);
        }
    }

    return (
        <div className='w-full max-w-lg lg:max-w-[380px] bg-white border border-slate-200 text-slate-500 text-sm rounded-3xl shadow-xl overflow-hidden'>
            {/* Custom CSS for animations */}
            <style jsx>{`
                @keyframes slideInUp {
                    0% {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                @keyframes fadeIn {
                    0% {
                        opacity: 0;
                    }
                    100% {
                        opacity: 1;
                    }
                }
                @keyframes pulse {
                    0%, 100% {
                        transform: scale(1);
                    }
                    50% {
                        transform: scale(1.05);
                    }
                }
                @keyframes bounce {
                    0%, 100% {
                        transform: translateY(0);
                    }
                    50% {
                        transform: translateY(-5px);
                    }
                }
                @keyframes shimmer {
                    0% {
                        background-position: -200px 0;
                    }
                    100% {
                        background-position: calc(200px + 100%) 0;
                    }
                }
                .slide-in-up {
                    animation: slideInUp 0.6s ease-out;
                }
                .fade-in {
                    animation: fadeIn 0.8s ease-out;
                }
                .pulse-animation {
                    animation: pulse 2s infinite;
                }
                .bounce-animation {
                    animation: bounce 2s infinite;
                }
                .shimmer-effect {
                    background: linear-gradient(
                        90deg,
                        transparent,
                        rgba(34, 197, 94, 0.1),
                        transparent
                    );
                    background-size: 200px 100%;
                    animation: shimmer 2s infinite;
                }
            `}</style>
            
            {/* Header */}
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/20 rounded-xl">
                        <CreditCard className="text-white" size={20} />
                    </div>
                    <div>
                        <h2 className='text-xl font-bold text-white'>Order Summary</h2>
                        <p className="text-green-100 text-sm">Secure checkout</p>
                    </div>
                </div>
            </div>
            
            <div className="p-6 space-y-6">
                {/* Payment Method Section */}
                <div className="slide-in-up">
                    <div className="flex items-center gap-2 mb-4">
                        <CreditCard className="text-green-600" size={18} />
                        <h3 className="font-semibold text-slate-700">Payment Method</h3>
                    </div>
                    <div className="space-y-3">
                        <div className={`flex items-center gap-3 p-3 rounded-xl border-2 transition-all duration-300 cursor-pointer ${
                            paymentMethod === 'COD' 
                                ? 'border-green-500 bg-green-50' 
                                : 'border-slate-200 hover:border-slate-300'
                        }`}>
                            <input 
                                type="radio" 
                                id="COD" 
                                onChange={() => setPaymentMethod('COD')} 
                                checked={paymentMethod === 'COD'} 
                                className="accent-green-500" 
                            />
                            <div className="flex items-center gap-2">
                                <Truck className="text-slate-600" size={16} />
                                <label htmlFor="COD" className='cursor-pointer font-medium'>Cash on Delivery</label>
                            </div>
                            {paymentMethod === 'COD' && <CheckCircle className="text-green-500 ml-auto" size={16} />}
                        </div>
                        
                        <div className={`flex items-center gap-3 p-3 rounded-xl border-2 transition-all duration-300 cursor-pointer ${
                            paymentMethod === 'STRIPE' 
                                ? 'border-green-500 bg-green-50' 
                                : 'border-slate-200 hover:border-slate-300'
                        }`}>
                            <input 
                                type="radio" 
                                id="STRIPE" 
                                name='payment' 
                                onChange={() => setPaymentMethod('STRIPE')} 
                                checked={paymentMethod === 'STRIPE'} 
                                className="accent-green-500" 
                            />
                            <div className="flex items-center gap-2">
                                <Shield className="text-slate-600" size={16} />
                                <label htmlFor="STRIPE" className='cursor-pointer font-medium'>Stripe Payment</label>
                            </div>
                            {paymentMethod === 'STRIPE' && <CheckCircle className="text-green-500 ml-auto" size={16} />}
                        </div>
                    </div>
                </div>
                {/* Delivery Address Section */}
                <div className="slide-in-up">
                    <div className="flex items-center gap-2 mb-4">
                        <MapPinIcon className="text-green-600" size={18} />
                        <h3 className="font-semibold text-slate-700">Delivery Address</h3>
            </div>
                {
                    selectedAddress ? (
                            <div className='bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-2xl border border-green-200 shadow-sm'>
                            <div className='flex items-start justify-between'>
                                    <div className='flex items-start gap-3'>
                                        <div className="p-2 bg-green-100 rounded-lg">
                                            <MapPinIcon size={16} className='text-green-600' />
                                        </div>
                                    <div className='text-sm'>
                                            <p className='font-semibold text-slate-800'>{selectedAddress.name}</p>
                                            <p className='text-slate-600'>{selectedAddress.street}</p>
                                            <p className='text-slate-600'>{selectedAddress.city}, {selectedAddress.state} {selectedAddress.zip}</p>
                                            <p className='text-slate-600'>{selectedAddress.country}</p>
                                            <p className='text-slate-600 mt-1 flex items-center gap-1'>
                                                <span>📞</span> {selectedAddress.phone}
                                            </p>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => setShowAddressDropdown(!showAddressDropdown)}
                                        className='text-slate-500 hover:text-green-600 p-2 rounded-lg hover:bg-white/50 transition-all duration-300'
                                >
                                    <SquarePenIcon size={16} />
                                </button>
                            </div>
                            
                            {showAddressDropdown && addressList.length > 1 && (
                                    <div className='mt-4 border-t border-green-200 pt-4 fade-in'>
                                        <p className='text-xs text-slate-500 mb-3 font-medium'>Choose different address:</p>
                                    <div className='space-y-2'>
                                        {addressList.filter(addr => addr.id !== selectedAddress.id).map((address, index) => (
                                            <div 
                                                key={address.id || index}
                                                onClick={() => {
                                                    setSelectedAddress(address);
                                                    setShowAddressDropdown(false);
                                                }}
                                                    className='p-3 border border-green-200 rounded-xl cursor-pointer hover:bg-white/50 transition-all duration-300 hover:shadow-sm'
                                            >
                                                    <p className='font-medium text-slate-700'>{address.name}</p>
                                                <p className='text-slate-500 text-xs'>{address.city}, {address.state} {address.zip}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                            <div className='space-y-4'>
                            {
                                addressList.length > 0 ? (
                                        <div className='space-y-3'>
                                        {addressList.map((address, index) => (
                                            <div 
                                                key={address.id || index}
                                                onClick={() => setSelectedAddress(address)}
                                                    className='p-4 border border-slate-200 rounded-xl cursor-pointer hover:bg-green-50 hover:border-green-200 transition-all duration-300 hover:shadow-sm'
                                                >
                                                    <div className='flex items-start gap-3'>
                                                        <div className="p-2 bg-slate-100 rounded-lg">
                                                            <MapPinIcon size={16} className='text-slate-600' />
                                                        </div>
                                                    <div className='text-sm'>
                                                        <p className='font-medium text-slate-700'>{address.name}</p>
                                                        <p className='text-slate-500'>{address.street}</p>
                                                        <p className='text-slate-500'>{address.city}, {address.state} {address.zip}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                        <div className='text-center py-6 text-slate-400'>
                                            <div className="w-16 h-16 mx-auto mb-3 bg-slate-100 rounded-full flex items-center justify-center">
                                                <MapPinIcon size={24} className='opacity-50' />
                                            </div>
                                            <p className='text-sm font-medium'>No addresses found</p>
                                    </div>
                                )
                            }
                            <button 
                                    className='flex items-center justify-center gap-2 w-full p-4 border-2 border-dashed border-green-300 rounded-xl text-green-600 hover:border-green-400 hover:bg-green-50 transition-all duration-300 font-medium' 
                                onClick={() => setShowAddressModal(true)}
                            >
                                <PlusIcon size={18} />
                                Add New Address
                            </button>
                        </div>
                    )
                }
            </div>
                {/* Order Details Section */}
                <div className="slide-in-up">
                    <div className="flex items-center gap-2 mb-4">
                        <Gift className="text-green-600" size={18} />
                        <h3 className="font-semibold text-slate-700">Order Details</h3>
                    </div>
                    
                    <div className='bg-slate-50 p-4 rounded-2xl space-y-3'>
                        <div className='flex justify-between items-center'>
                            <span className="text-slate-600">Subtotal:</span>
                            <span className="font-semibold text-slate-800">{currency}{totalPrice.toLocaleString()}</span>
                        </div>
                        <div className='flex justify-between items-center'>
                            <span className="text-slate-600">Shipping:</span>
                            <span className="font-semibold text-green-600">Free</span>
                        </div>
                        {coupon && (
                            <div className='flex justify-between items-center'>
                                <span className="text-slate-600">Coupon ({coupon.code}):</span>
                                <span className="font-semibold text-red-600">-{currency}{(coupon.discount / 100 * totalPrice).toFixed(2)}</span>
                            </div>
                        )}
                    </div>
                    
                    {/* Coupon Section */}
                    <div className="mt-4">
                {
                    !coupon ? (
                                <form onSubmit={e => toast.promise(handleCouponCode(e), { loading: 'Checking Coupon...' })} className='flex gap-2'>
                                    <input 
                                        onChange={(e) => setCouponCodeInput(e.target.value)} 
                                        value={couponCodeInput} 
                                        type="text" 
                                        placeholder='Enter coupon code' 
                                        className='flex-1 border border-slate-300 p-3 rounded-xl outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300' 
                                    />
                                    <button className='bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 active:scale-95 transition-all duration-300 font-medium'>
                                        Apply
                                    </button>
                        </form>
                    ) : (
                                <div className='bg-green-50 border border-green-200 p-4 rounded-xl'>
                                    <div className='flex items-center justify-between'>
                                        <div className="flex items-center gap-2">
                                            <Sparkles className="text-green-600" size={16} />
                                            <div>
                                                <p className="font-semibold text-green-800">{coupon.code.toUpperCase()}</p>
                                                <p className="text-xs text-green-600">{coupon.description}</p>
                                            </div>
                                        </div>
                                        <button 
                                            onClick={() => setCoupon('')} 
                                            className='text-green-600 hover:text-red-600 transition-colors duration-300 p-1 rounded-lg hover:bg-white/50'
                                        >
                                            <XIcon size={16} />
                                        </button>
                                    </div>
                        </div>
                    )
                }
            </div>
                </div>
                
                {/* Total Section */}
                <div className="slide-in-up">
                    <div className='bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-2xl border border-green-200'>
                        <div className='flex justify-between items-center'>
                            <span className="text-lg font-semibold text-slate-800">Total:</span>
                            <span className="text-2xl font-bold text-green-600">
                                {currency}{coupon ? (totalPrice - (coupon.discount / 100 * totalPrice)).toFixed(2) : totalPrice.toLocaleString()}
                            </span>
                        </div>
                    </div>
            </div>
                
                {/* Place Order Button */}
                <div className="slide-in-up">
            <button 
                onClick={handlePlaceOrder}
                disabled={isPlacingOrder || !selectedAddress || items.length === 0}
                        className={`w-full py-4 rounded-2xl font-bold text-lg transition-all duration-300 ${
                    isPlacingOrder || !selectedAddress || items.length === 0
                        ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                                : 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 active:scale-95 shadow-lg hover:shadow-xl'
                        }`}
                    >
                        {isPlacingOrder ? (
                            <div className="flex items-center justify-center gap-2">
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                Placing Order...
                            </div>
                        ) : (
                            <div className="flex items-center justify-center gap-2">
                                <Zap className="text-white" size={20} />
                                Place Order
                            </div>
                        )}
            </button>
                </div>
            </div>

            {showAddressModal && <AddressModal setShowAddressModal={setShowAddressModal} />}
        </div>
    )
}

export default OrderSummary