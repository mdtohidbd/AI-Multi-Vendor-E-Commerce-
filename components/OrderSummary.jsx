import { PlusIcon, SquarePenIcon, XIcon, ChevronDownIcon, MapPinIcon } from 'lucide-react';
import React, { useState, useEffect } from 'react'
import AddressModal from './AddressModal';
import { useSelector, useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { clearCart } from '@/lib/features/cart/cartSlice';

const OrderSummary = ({ totalPrice, items }) => {

    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$';

    const router = useRouter();
    const dispatch = useDispatch();

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

        try {
            // Simulate order creation
            const orderData = {
                items: items,
                totalPrice: coupon ? (totalPrice - (coupon.discount / 100 * totalPrice)) : totalPrice,
                address: selectedAddress,
                paymentMethod: paymentMethod,
                coupon: coupon || null,
                status: 'ORDER_PLACED'
            };

            // TODO: Replace with actual API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Clear cart after successful order
            dispatch(clearCart());
            
            toast.success('Order placed successfully!');
            router.push('/orders');
        } catch (error) {
            toast.error('Failed to place order. Please try again.');
        } finally {
            setIsPlacingOrder(false);
        }
    }

    return (
        <div className='w-full max-w-lg lg:max-w-[340px] bg-slate-50/30 border border-slate-200 text-slate-500 text-sm rounded-xl p-7'>
            <h2 className='text-xl font-medium text-slate-600'>Payment Summary</h2>
            <p className='text-slate-400 text-xs my-4'>Payment Method</p>
            <div className='flex gap-2 items-center'>
                <input type="radio" id="COD" onChange={() => setPaymentMethod('COD')} checked={paymentMethod === 'COD'} className='accent-gray-500' />
                <label htmlFor="COD" className='cursor-pointer'>COD</label>
            </div>
            <div className='flex gap-2 items-center mt-1'>
                <input type="radio" id="STRIPE" name='payment' onChange={() => setPaymentMethod('STRIPE')} checked={paymentMethod === 'STRIPE'} className='accent-gray-500' />
                <label htmlFor="STRIPE" className='cursor-pointer'>Stripe Payment</label>
            </div>
            <div className='my-4 py-4 border-y border-slate-200'>
                <p className='text-slate-400 mb-3'>Delivery Address</p>
                {
                    selectedAddress ? (
                        <div className='bg-slate-50 p-3 rounded-lg border border-slate-200'>
                            <div className='flex items-start justify-between'>
                                <div className='flex items-start gap-2'>
                                    <MapPinIcon size={16} className='text-slate-400 mt-1' />
                                    <div className='text-sm'>
                                        <p className='font-medium text-slate-700'>{selectedAddress.name}</p>
                                        <p className='text-slate-500'>{selectedAddress.street}</p>
                                        <p className='text-slate-500'>{selectedAddress.city}, {selectedAddress.state} {selectedAddress.zip}</p>
                                        <p className='text-slate-500'>{selectedAddress.country}</p>
                                        <p className='text-slate-500 mt-1'>📞 {selectedAddress.phone}</p>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => setShowAddressDropdown(!showAddressDropdown)}
                                    className='text-slate-500 hover:text-slate-700 p-1'
                                >
                                    <SquarePenIcon size={16} />
                                </button>
                            </div>
                            
                            {showAddressDropdown && addressList.length > 1 && (
                                <div className='mt-3 border-t border-slate-200 pt-3'>
                                    <p className='text-xs text-slate-400 mb-2'>Choose different address:</p>
                                    <div className='space-y-2'>
                                        {addressList.filter(addr => addr.id !== selectedAddress.id).map((address, index) => (
                                            <div 
                                                key={address.id || index}
                                                onClick={() => {
                                                    setSelectedAddress(address);
                                                    setShowAddressDropdown(false);
                                                }}
                                                className='p-2 border border-slate-200 rounded cursor-pointer hover:bg-slate-100 text-sm'
                                            >
                                                <p className='font-medium'>{address.name}</p>
                                                <p className='text-slate-500 text-xs'>{address.city}, {address.state} {address.zip}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className='space-y-3'>
                            {
                                addressList.length > 0 ? (
                                    <div className='space-y-2'>
                                        {addressList.map((address, index) => (
                                            <div 
                                                key={address.id || index}
                                                onClick={() => setSelectedAddress(address)}
                                                className='p-3 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors'
                                            >
                                                <div className='flex items-start gap-2'>
                                                    <MapPinIcon size={16} className='text-slate-400 mt-1' />
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
                                    <div className='text-center py-4 text-slate-400'>
                                        <MapPinIcon size={24} className='mx-auto mb-2 opacity-50' />
                                        <p className='text-sm'>No addresses found</p>
                                    </div>
                                )
                            }
                            <button 
                                className='flex items-center justify-center gap-2 w-full p-2 border-2 border-dashed border-slate-300 rounded-lg text-slate-600 hover:border-slate-400 hover:bg-slate-50 transition-colors' 
                                onClick={() => setShowAddressModal(true)}
                            >
                                <PlusIcon size={18} />
                                Add New Address
                            </button>
                        </div>
                    )
                }
            </div>
            <div className='pb-4 border-b border-slate-200'>
                <div className='flex justify-between'>
                    <div className='flex flex-col gap-1 text-slate-400'>
                        <p>Subtotal:</p>
                        <p>Shipping:</p>
                        {coupon && <p>Coupon:</p>}
                    </div>
                    <div className='flex flex-col gap-1 font-medium text-right'>
                        <p>{currency}{totalPrice.toLocaleString()}</p>
                        <p>Free</p>
                        {coupon && <p>{`-${currency}${(coupon.discount / 100 * totalPrice).toFixed(2)}`}</p>}
                    </div>
                </div>
                {
                    !coupon ? (
                        <form onSubmit={e => toast.promise(handleCouponCode(e), { loading: 'Checking Coupon...' })} className='flex justify-center gap-3 mt-3'>
                            <input onChange={(e) => setCouponCodeInput(e.target.value)} value={couponCodeInput} type="text" placeholder='Coupon Code' className='border border-slate-400 p-1.5 rounded w-full outline-none' />
                            <button className='bg-slate-600 text-white px-3 rounded hover:bg-slate-800 active:scale-95 transition-all'>Apply</button>
                        </form>
                    ) : (
                        <div className='w-full flex items-center justify-center gap-2 text-xs mt-2'>
                            <p>Code: <span className='font-semibold ml-1'>{coupon.code.toUpperCase()}</span></p>
                            <p>{coupon.description}</p>
                            <XIcon size={18} onClick={() => setCoupon('')} className='hover:text-red-700 transition cursor-pointer' />
                        </div>
                    )
                }
            </div>
            <div className='flex justify-between py-4'>
                <p>Total:</p>
                <p className='font-medium text-right'>{currency}{coupon ? (totalPrice - (coupon.discount / 100 * totalPrice)).toFixed(2) : totalPrice.toLocaleString()}</p>
            </div>
            <button 
                onClick={handlePlaceOrder}
                disabled={isPlacingOrder || !selectedAddress || items.length === 0}
                className={`w-full py-3 rounded-lg font-medium transition-all ${
                    isPlacingOrder || !selectedAddress || items.length === 0
                        ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                        : 'bg-slate-700 text-white hover:bg-slate-900 active:scale-95'
                }`}
            >
                {isPlacingOrder ? 'Placing Order...' : 'Place Order'}
            </button>

            {showAddressModal && <AddressModal setShowAddressModal={setShowAddressModal} />}

        </div>
    )
}

export default OrderSummary