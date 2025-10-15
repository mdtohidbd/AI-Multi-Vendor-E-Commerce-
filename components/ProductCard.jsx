'use client'
import { StarIcon, HeartIcon, ShoppingCartIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

const ProductCard = ({ product, index }) => {

    const [isHovered, setIsHovered] = useState(false)
    const [isLiked, setIsLiked] = useState(false)
    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$'

    // calculate the average rating of the product
    const rating = Math.round(product.rating.reduce((acc, curr) => acc + curr.rating, 0) / product.rating.length);

    return (
        <div className='max-xl:mx-auto'>
            {/* Custom CSS for animations */}
            <style jsx>{`
                @keyframes shimmer {
                    0% {
                        background-position: -200px 0;
                    }
                    100% {
                        background-position: calc(200px + 100%) 0;
                    }
                }
                @keyframes bounce-in {
                    0% {
                        transform: scale(0);
                        opacity: 0;
                    }
                    50% {
                        transform: scale(1.2);
                    }
                    100% {
                        transform: scale(1);
                        opacity: 1;
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
                @keyframes floating {
                    0%, 100% {
                        transform: translateY(0px);
                    }
                    50% {
                        transform: translateY(-5px);
                    }
                }
                .shimmer-effect {
                    background: linear-gradient(
                        90deg,
                        transparent,
                        rgba(255, 255, 255, 0.4),
                        transparent
                    );
                    background-size: 200px 100%;
                    animation: shimmer 2s infinite;
                }
                .bounce-in {
                    animation: bounce-in 0.5s ease-out;
                }
                .glow-animation {
                    animation: glow 2s ease-in-out infinite;
                }
                .floating {
                    animation: floating 3s ease-in-out infinite;
                }
            `}</style>
            
            <Link href={`/product/${product.id}`} className='group block'>
                <div 
                    className='relative bg-gradient-to-br from-gray-50 to-gray-100 h-40 sm:w-60 sm:h-68 rounded-2xl flex items-center justify-center overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 group-hover:scale-[1.02] border border-gray-200/50'
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {/* Background decorative elements */}
                    <div className='absolute top-4 right-4 w-8 h-8 bg-green-100 rounded-full opacity-50 group-hover:scale-125 transition-all duration-300'></div>
                    <div className='absolute bottom-6 left-6 w-6 h-6 bg-blue-100 rounded-full opacity-30 group-hover:scale-150 transition-all duration-300'></div>
                    
                    {/* Shimmer effect overlay */}
                    <div className={`absolute inset-0 shimmer-effect opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                    
                    {/* Product Image */}
                    <Image 
                        width={500} 
                        height={500} 
                        className='max-h-30 sm:max-h-40 w-auto group-hover:scale-110 group-hover:rotate-2 transition-all duration-500 drop-shadow-lg floating' 
                        style={{ animationDelay: `${index * 0.5}s` }}
                        src={product.images[0]} 
                        alt={product.name} 
                    />
                    
                    {/* Action buttons overlay */}
                    <div className={`absolute top-4 right-4 flex flex-col gap-2 transition-all duration-300 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
                        <button 
                            onClick={(e) => {
                                e.preventDefault()
                                setIsLiked(!isLiked)
                            }}
                            className={`p-2 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110 ${
                                isLiked 
                                    ? 'bg-red-500 text-white shadow-lg' 
                                    : 'bg-white/80 text-gray-600 hover:bg-red-50'
                            }`}
                        >
                            <HeartIcon size={16} fill={isLiked ? 'white' : 'transparent'} className='bounce-in' />
                        </button>
                        <button 
                            onClick={(e) => e.preventDefault()}
                            className='p-2 rounded-full bg-white/80 text-gray-600 backdrop-blur-sm hover:bg-green-50 hover:text-green-600 hover:scale-110 transition-all duration-300'
                        >
                            <ShoppingCartIcon size={16} />
                        </button>
                    </div>
                    
                    {/* Sale badge */}
                    {product.mrp > product.price && (
                        <div className='absolute top-4 left-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg glow-animation'>
                            SALE
                        </div>
                    )}
                </div>
                
                {/* Product Info */}
                <div className='flex justify-between gap-3 text-sm text-slate-800 pt-4 max-w-60'>
                    <div className='flex-1'>
                        <p className='font-medium text-slate-700 group-hover:text-green-600 transition-colors duration-300 line-clamp-2'>
                            {product.name}
                        </p>
                        
                        {/* Rating Stars */}
                        <div className='flex items-center mt-2 gap-1'>
                            <div className='flex'>
                                {Array(5).fill('').map((_, starIndex) => (
                                    <StarIcon 
                                        key={starIndex} 
                                        size={14} 
                                        className={`text-transparent transition-all duration-200 hover:scale-125 ${
                                            rating >= starIndex + 1 ? 'glow-animation' : ''
                                        }`}
                                        fill={rating >= starIndex + 1 ? "#22C55E" : "#E5E7EB"} 
                                        style={{ animationDelay: `${starIndex * 0.1}s` }}
                                    />
                                ))}
                            </div>
                            <span className='text-xs text-gray-500 ml-1'>({product.rating.length})</span>
                        </div>
                    </div>
                    
                    {/* Price */}
                    <div className='text-right'>
                        <p className='font-bold text-green-600 text-lg group-hover:scale-110 transition-transform duration-300'>
                            {currency}{product.price}
                        </p>
                        {product.mrp > product.price && (
                            <p className='text-xs text-gray-400 line-through'>
                                {currency}{product.mrp}
                            </p>
                        )}
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default ProductCard