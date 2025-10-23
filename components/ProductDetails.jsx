'use client'

import { addToCart } from "@/lib/features/cart/cartSlice";
import { StarIcon, TagIcon, EarthIcon, CreditCardIcon, UserIcon, Heart, ShoppingCart, Sparkles, Zap, Gift, Shield, Truck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import Counter from "./Counter";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";

const ProductDetails = ({ product }) => {

    const productId = product.id;
    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$';

    const cart = useSelector(state => state.cart.cartItems);
    const dispatch = useDispatch();

    const router = useRouter()

    const [mainImage, setMainImage] = useState(product.images[0]);
    const [isFavorited, setIsFavorited] = useState(false);
    const [isAddingToCart, setIsAddingToCart] = useState(false);

    const addToCartHandler = async () => {
        setIsAddingToCart(true);
        
        try {
            dispatch(addToCart({ productId }));
            toast.success(`${product.name} added to cart! 🛒`, {
                duration: 2000,
                position: 'top-right',
                style: {
                    background: '#10B981',
                    color: '#fff',
                    borderRadius: '8px',
                },
            });
        } catch (error) {
            toast.error('Failed to add item to cart');
        } finally {
            setIsAddingToCart(false);
        }
    }

    const averageRating = product.rating.reduce((acc, item) => acc + item.rating, 0) / product.rating.length;
    
    return (
        <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
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
                @keyframes glow {
                    0%, 100% {
                        box-shadow: 0 0 5px rgba(34, 197, 94, 0.3);
                    }
                    50% {
                        box-shadow: 0 0 20px rgba(34, 197, 94, 0.6);
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
                .glow-animation {
                    animation: glow 2s ease-in-out infinite;
                }
            `}</style>

            <div className="flex max-lg:flex-col">
                {/* Product Images Section */}
                <div className="slide-in-left flex-1 p-8">
                    <div className="flex max-sm:flex-col-reverse gap-6">
                        {/* Thumbnail Images */}
                        <div className="flex sm:flex-col gap-3">
                            {product.images.map((image, index) => (
                                <div 
                                    key={index} 
                                    onClick={() => setMainImage(product.images[index])} 
                                    className={`bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center size-20 rounded-2xl group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                                        mainImage === image ? 'ring-2 ring-green-500 shadow-lg' : ''
                                    }`}
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    <Image 
                                        src={image} 
                                        className="group-hover:scale-110 transition-transform duration-300" 
                                        alt="" 
                                        width={60} 
                                        height={60} 
                                    />
                                </div>
                            ))}
                        </div>
                        
                        {/* Main Product Image */}
                        <div className="flex-1 flex justify-center items-center bg-gradient-to-br from-slate-50 to-white rounded-3xl shadow-lg overflow-hidden group">
                            <div className="relative">
                                <Image 
                                    src={mainImage} 
                                    alt={product.name}
                                    width={400} 
                                    height={400}
                                    className="group-hover:scale-105 transition-transform duration-500"
                                />
                                {/* Floating decoration */}
                                <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 float-animation"></div>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Product Information Section */}
                <div className="slide-in-right flex-1 p-8 bg-gradient-to-br from-slate-50 to-white">
                    <div className="space-y-6">
                        {/* Product Title */}
                        <div className="space-y-3">
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                                {product.name}
                            </h1>
                            
                            {/* Rating */}
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-1">
                                    {Array(5).fill('').map((_, index) => (
                                        <StarIcon 
                                            key={index} 
                                            size={18} 
                                            className={`transition-all duration-300 hover:scale-125 ${
                                                averageRating >= index + 1 ? 'text-yellow-400 glow-animation' : 'text-slate-300'
                                            }`}
                                            fill={averageRating >= index + 1 ? "#FBBF24" : "#D1D5DB"}
                                            style={{ animationDelay: `${index * 0.1}s` }}
                                        />
                                    ))}
                                </div>
                                <span className="text-slate-600 font-medium">{product.rating.length} Reviews</span>
                            </div>
                        </div>

                        {/* Price Section */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <span className="text-4xl font-bold text-green-600">
                                    {currency}{product.price}
                                </span>
                                <span className="text-2xl text-slate-400 line-through">
                                    {currency}{product.mrp}
                                </span>
                            </div>
                            
                            {/* Discount Badge */}
                            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg glow-animation">
                                <TagIcon size={16} />
                                Save {((product.mrp - product.price) / product.mrp * 100).toFixed(0)}% right now
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-4">
                            {/* Favorite Button */}
                            <button 
                                onClick={() => setIsFavorited(!isFavorited)}
                                className={`p-3 rounded-2xl transition-all duration-300 hover:scale-110 ${
                                    isFavorited 
                                        ? 'bg-red-500 text-white shadow-lg' 
                                        : 'bg-slate-100 text-slate-600 hover:bg-red-50'
                                }`}
                            >
                                <Heart size={20} fill={isFavorited ? 'white' : 'transparent'} />
                            </button>

                            {/* Add to Cart Button */}
                            <button 
                                onClick={addToCartHandler}
                                disabled={isAddingToCart}
                                className={`flex-1 py-4 px-8 rounded-2xl font-bold text-lg transition-all duration-300 ${
                                    isAddingToCart 
                                        ? 'bg-slate-300 text-slate-500 cursor-not-allowed' 
                                        : 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 active:scale-95 shadow-lg hover:shadow-xl'
                                }`}
                            >
                                {isAddingToCart ? (
                                    <div className="flex items-center justify-center gap-2">
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                        Adding...
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center gap-2">
                                        <ShoppingCart size={20} />
                                        {!cart[productId] ? 'Add to Cart' : 'View Cart'}
                                    </div>
                                )}
                            </button>
                        </div>

                        {/* Quantity Counter */}
                        {cart[productId] && (
                            <div className="slide-in-up bg-green-50 p-4 rounded-2xl border border-green-200">
                                <p className="text-lg text-slate-800 font-semibold mb-3">Quantity</p>
                                <Counter productId={productId} />
                            </div>
                        )}

                        {/* Features */}
                        <div className="space-y-4 pt-6 border-t border-slate-200">
                            <div className="grid grid-cols-1 gap-4">
                                <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl">
                                    <div className="p-2 bg-blue-500 rounded-lg">
                                        <Truck className="text-white" size={18} />
                                    </div>
                                    <span className="text-slate-700 font-medium">Free shipping worldwide</span>
                                </div>
                                
                                <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-green-50 to-green-100 rounded-xl">
                                    <div className="p-2 bg-green-500 rounded-lg">
                                        <Shield className="text-white" size={18} />
                                    </div>
                                    <span className="text-slate-700 font-medium">100% Secured Payment</span>
                                </div>
                                
                                <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl">
                                    <div className="p-2 bg-purple-500 rounded-lg">
                                        <UserIcon className="text-white" size={18} />
                                    </div>
                                    <span className="text-slate-700 font-medium">Trusted by top brands</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails