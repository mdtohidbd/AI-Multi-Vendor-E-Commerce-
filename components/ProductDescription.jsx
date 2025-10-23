'use client'
import { ArrowRight, StarIcon, Sparkles, MessageCircle, Store, Heart, Zap } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

const ProductDescription = ({ product }) => {

    const [selectedTab, setSelectedTab] = useState('Description')

    return (
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
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
                        transform: translateY(-5px);
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

            <div className="p-8">
                {/* Enhanced Tabs */}
                <div className="slide-in-up mb-8">
                    <div className="flex border-b border-slate-200 max-w-2xl">
                        {[
                            { name: 'Description', icon: MessageCircle },
                            { name: 'Reviews', icon: StarIcon }
                        ].map((tab, index) => {
                            const IconComponent = tab.icon;
                            return (
                                <button 
                                    key={index}
                                    onClick={() => setSelectedTab(tab.name)}
                                    className={`flex items-center gap-2 px-6 py-4 font-medium transition-all duration-300 ${
                                        tab.name === selectedTab 
                                            ? 'border-b-2 border-green-500 text-green-600 bg-green-50' 
                                            : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
                                    }`}
                                >
                                    <IconComponent size={18} />
                                    {tab.name}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Description Section */}
                {selectedTab === "Description" && (
                    <div className="slide-in-up">
                        <div className="bg-gradient-to-r from-slate-50 to-white p-6 rounded-2xl border border-slate-100">
                            <div className="flex items-center gap-2 mb-4">
                                <Sparkles className="text-green-600" size={20} />
                                <h3 className="text-lg font-semibold text-slate-800">Product Description</h3>
                            </div>
                            <p className="text-slate-600 leading-relaxed">{product.description}</p>
                        </div>
                    </div>
                )}

                {/* Reviews Section */}
                {selectedTab === "Reviews" && (
                    <div className="slide-in-up">
                        <div className="space-y-6">
                            <div className="flex items-center gap-2 mb-6">
                                <StarIcon className="text-yellow-500" size={20} />
                                <h3 className="text-lg font-semibold text-slate-800">Customer Reviews</h3>
                                <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-medium">
                                    {product.rating.length} Reviews
                                </span>
                            </div>
                            
                            <div className="space-y-6">
                                {product.rating.map((item, index) => (
                                    <div 
                                        key={index} 
                                        className="bg-gradient-to-r from-slate-50 to-white p-6 rounded-2xl border border-slate-100 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
                                        style={{ animationDelay: `${index * 0.1}s` }}
                                    >
                                        <div className="flex gap-4">
                                            <div className="relative">
                                                <Image 
                                                    src={item.user.image} 
                                                    alt={item.user.name}
                                                    className="size-12 rounded-full ring-2 ring-green-200" 
                                                    width={48} 
                                                    height={48} 
                                                />
                                                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <div className="flex items-center gap-1">
                                                        {Array(5).fill('').map((_, starIndex) => (
                                                            <StarIcon 
                                                                key={starIndex} 
                                                                size={16} 
                                                                className={`transition-all duration-300 hover:scale-125 ${
                                                                    item.rating >= starIndex + 1 ? 'text-yellow-400 glow-animation' : 'text-slate-300'
                                                                }`}
                                                                fill={item.rating >= starIndex + 1 ? "#FBBF24" : "#D1D5DB"}
                                                            />
                                                        ))}
                                                    </div>
                                                    <span className="text-sm text-slate-500">
                                                        {new Date(item.createdAt).toLocaleDateString()}
                                                    </span>
                                                </div>
                                                <p className="text-slate-700 mb-3 leading-relaxed">{item.review}</p>
                                                <div className="flex items-center gap-2">
                                                    <Heart className="text-red-400" size={14} />
                                                    <span className="font-medium text-slate-800">{item.user.name}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Store Information */}
                <div className="slide-in-up mt-12">
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-200">
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <Image 
                                    src={product.store.logo} 
                                    alt={product.store.name}
                                    className="size-16 rounded-2xl ring-4 ring-green-200 shadow-lg" 
                                    width={64} 
                                    height={64} 
                                />
                                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                                    <Store className="text-white" size={12} />
                                </div>
                            </div>
                            <div className="flex-1">
                                <h4 className="font-semibold text-slate-800 text-lg">Product by {product.store.name}</h4>
                                <p className="text-slate-600 text-sm mb-3">Visit our store for more amazing products</p>
                                <Link 
                                    href={`/shop/${product.store.username}`} 
                                    className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                                >
                                    <Zap size={16} />
                                    View Store
                                    <ArrowRight size={16} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDescription