'use client'
import ProductDescription from "@/components/ProductDescription";
import ProductDetails from "@/components/ProductDetails";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Sparkles, Zap, Star, Heart, ShoppingCart } from "lucide-react";

export default function Product() {

    const { productId } = useParams();
    const [product, setProduct] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [isFavorited, setIsFavorited] = useState(false);
    const products = useSelector(state => state.product.list);

    const fetchProduct = async () => {
        const product = products.find((product) => product.id === productId);
        setProduct(product);
        setIsLoading(false);
    }

    useEffect(() => {
        if (products.length > 0) {
            fetchProduct()
        }
        scrollTo(0, 0)
    }, [productId,products]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-green-50">
                <div className="flex flex-col items-center gap-4">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-500"></div>
                    <p className="text-slate-600 text-lg">Loading product details...</p>
                </div>
            </div>
        );
    }

    return (
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

            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Enhanced Breadcrumbs */}
                <div className="slide-in-up mb-8">
                    <div className="flex items-center gap-2 text-slate-600 text-sm">
                        <span className="hover:text-green-600 transition-colors duration-300 cursor-pointer">Home</span>
                        <span className="text-slate-400">/</span>
                        <span className="hover:text-green-600 transition-colors duration-300 cursor-pointer">Products</span>
                        <span className="text-slate-400">/</span>
                        <span className="text-green-600 font-medium">{product?.category}</span>
                    </div>
                </div>

                {/* Product Details with Animations */}
                {product && (
                    <div className="slide-in-up">
                        <ProductDetails product={product} />
                    </div>
                )}

                {/* Description & Reviews with Animations */}
                {product && (
                    <div className="slide-in-up mt-16">
                        <ProductDescription product={product} />
                    </div>
                )}
            </div>
        </div>
    );
}