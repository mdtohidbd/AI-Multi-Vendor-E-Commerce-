'use client'
import Counter from "@/components/Counter";
import OrderSummary from "@/components/OrderSummary";
import PageTitle from "@/components/PageTitle";
import { deleteItemFromCart } from "@/lib/features/cart/cartSlice";
import { setAddresses } from "@/lib/features/address/addressSlice";
import { Trash2Icon, ShoppingCart, Heart, Star, Sparkles, Zap, Gift } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";

export default function Cart() {

    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$';
    
    const { cartItems } = useSelector(state => state.cart);
    const products = useSelector(state => state.product.list);

    const dispatch = useDispatch();

    const [cartArray, setCartArray] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [removingItem, setRemovingItem] = useState(null);

    const createCartArray = () => {
        setTotalPrice(0);
        const cartArray = [];
        for (const [key, value] of Object.entries(cartItems)) {
            const product = products.find(product => product.id === key);
            if (product) {
                cartArray.push({
                    ...product,
                    quantity: value,
                });
                setTotalPrice(prev => prev + product.price * value);
            }
        }
        setCartArray(cartArray);
    }

    const handleDeleteItemFromCart = async (productId) => {
        setRemovingItem(productId);
        
        // Add a small delay for animation
        await new Promise(resolve => setTimeout(resolve, 300));
        
        dispatch(deleteItemFromCart({ productId }));
        
        toast.success('Item removed from cart! 🗑️', {
            duration: 2000,
            position: 'top-right',
            style: {
                background: '#EF4444',
                color: '#fff',
                borderRadius: '8px',
            },
        });
        
        setRemovingItem(null);
    }

    useEffect(() => {
        if (products.length > 0) {
            createCartArray();
            setIsLoading(false);
        }
    }, [cartItems, products]);

    // Fetch addresses on component mount
    useEffect(() => {
        const fetchAddresses = async () => {
            try {
                const response = await fetch('/api/address');
                const data = await response.json();
                
                if (response.ok) {
                    dispatch(setAddresses(data.addresses));
                }
            } catch (error) {
                console.error('Failed to fetch addresses:', error);
            }
        };
        
        fetchAddresses();
    }, [dispatch]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
                    <p className="text-slate-600">Loading your cart...</p>
                </div>
            </div>
        );
    }

    return cartArray.length > 0 ? (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-green-50">
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
                @keyframes slideInLeft {
                    0% {
                        opacity: 0;
                        transform: translateX(-30px);
                    }
                    100% {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
                @keyframes slideInRight {
                    0% {
                        opacity: 0;
                        transform: translateX(30px);
                    }
                    100% {
                        opacity: 1;
                        transform: translateX(0);
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
                @keyframes bounce {
                    0%, 100% {
                        transform: translateY(0);
                    }
                    50% {
                        transform: translateY(-10px);
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
                @keyframes shimmer {
                    0% {
                        background-position: -200px 0;
                    }
                    100% {
                        background-position: calc(200px + 100%) 0;
                    }
                }
                @keyframes float {
                    0%, 100% {
                        transform: translateY(0px);
                    }
                    50% {
                        transform: translateY(-10px);
                    }
                }
                .slide-in-up {
                    animation: slideInUp 0.6s ease-out;
                }
                .slide-in-left {
                    animation: slideInLeft 0.6s ease-out;
                }
                .slide-in-right {
                    animation: slideInRight 0.6s ease-out;
                }
                .fade-in {
                    animation: fadeIn 0.8s ease-out;
                }
                .bounce-animation {
                    animation: bounce 2s infinite;
                }
                .pulse-animation {
                    animation: pulse 2s infinite;
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
                .float-animation {
                    animation: float 3s ease-in-out infinite;
                }
                .cart-item-enter {
                    animation: slideInUp 0.5s ease-out;
                }
                .cart-item-exit {
                    animation: slideInLeft 0.3s ease-in reverse;
                }
            `}</style>

            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Enhanced Header */}
                <div className="slide-in-up mb-8">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl shadow-lg">
                                <ShoppingCart className="text-white" size={28} />
                            </div>
                            <div>
                                <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                                    My Shopping Cart
                                </h1>
                                <p className="text-slate-600 mt-1">
                                    {cartArray.length} {cartArray.length === 1 ? 'item' : 'items'} in your cart
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Sparkles className="text-yellow-500" size={20} />
                            <span className="text-sm text-slate-600">Secure Checkout</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-start justify-between gap-8 max-lg:flex-col">
                    {/* Enhanced Product List */}
                    <div className="slide-in-left flex-1 max-w-4xl">
                        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
                            <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-4 border-b border-slate-100">
                                <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
                                    <Gift className="text-green-600" size={20} />
                                    Your Items
                                </h2>
                            </div>
                            
                            <div className="p-6">
                                {cartArray.map((item, index) => (
                                    <div 
                                        key={item.id} 
                                        className={`cart-item-enter mb-6 last:mb-0 ${
                                            removingItem === item.id ? 'cart-item-exit' : ''
                                        }`}
                                        style={{ animationDelay: `${index * 0.1}s` }}
                                    >
                                        <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-slate-50 to-white rounded-2xl border border-slate-100 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] group">
                                            {/* Product Image */}
                                            <div className="relative">
                                                <div className="w-20 h-20 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl flex items-center justify-center overflow-hidden shadow-md group-hover:shadow-xl transition-all duration-300">
                                                    <Image 
                                                        src={item.images[0]} 
                                                        alt={item.name}
                                                        width={80} 
                                                        height={80}
                                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                                    />
                                                </div>
                                                {/* Floating decoration */}
                                                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 float-animation"></div>
                                            </div>
                                            
                                            {/* Product Info */}
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-slate-800 group-hover:text-green-600 transition-colors duration-300">
                                                    {item.name}
                                                </h3>
                                                <p className="text-sm text-slate-500 mb-1">{item.category}</p>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-lg font-bold text-green-600">
                                                        {currency}{item.price}
                                                    </span>
                                                    <div className="flex items-center gap-1">
                                                        <Star className="text-yellow-400" size={14} fill="currentColor" />
                                                        <span className="text-xs text-slate-500">4.8</span>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            {/* Quantity Controls */}
                                            <div className="flex items-center gap-4">
                                                <div className="text-center">
                                            <Counter productId={item.id} />
                                                </div>
                                                
                                                {/* Total Price */}
                                                <div className="text-center min-w-[80px]">
                                                    <p className="text-lg font-bold text-slate-800">
                                                        {currency}{(item.price * item.quantity).toLocaleString()}
                                                    </p>
                                                </div>
                                                
                                                {/* Remove Button */}
                                                <button 
                                                    onClick={() => handleDeleteItemFromCart(item.id)}
                                                    disabled={removingItem === item.id}
                                                    className="p-3 text-red-500 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all duration-300 hover:scale-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed group"
                                                >
                                                    <Trash2Icon size={18} className="group-hover:animate-bounce" />
                                            </button> 
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    
                    {/* Enhanced Order Summary */}
                    <div className="slide-in-right">
                    <OrderSummary totalPrice={totalPrice} items={cartArray} />
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-green-50">
            <div className="text-center fade-in">
                <div className="mb-8">
                    <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center shadow-xl">
                        <ShoppingCart className="text-slate-400" size={48} />
                    </div>
                    <h1 className="text-4xl font-bold text-slate-600 mb-4">Your cart is empty</h1>
                    <p className="text-lg text-slate-500 mb-8">Start shopping to add items to your cart</p>
                    <div className="flex items-center justify-center gap-2 text-slate-400">
                        <Heart className="animate-pulse" size={20} />
                        <span className="text-sm">Happy Shopping!</span>
                        <Heart className="animate-pulse" size={20} />
                    </div>
                </div>
            </div>
        </div>
    )
}