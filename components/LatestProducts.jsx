'use client'
import React, { useMemo } from 'react'
import Title from './Title'
import ProductCard from './ProductCard'
import { useSelector } from 'react-redux'

const LatestProducts = React.memo(() => {

    const displayQuantity = 4
    const products = useSelector(state => state.product.list)
    
    // Memoize sorted products to prevent re-sorting on every render
    const latestProducts = useMemo(() => {
        return products
            .slice()
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, displayQuantity);
    }, [products, displayQuantity]);

    return (
        <div className='px-6 my-30 max-w-6xl mx-auto'>
            {/* Custom CSS for animations */}
            <style jsx>{`
                @keyframes fadeInUp {
                    0% {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                @keyframes staggerFade {
                    0% {
                        opacity: 0;
                        transform: translateY(20px) scale(0.95);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }
                .fade-in-up {
                    animation: fadeInUp 0.8s ease-out;
                }
                .stagger-animation {
                    animation: staggerFade 0.6s ease-out;
                }
                .stagger-delay-1 { animation-delay: 0.1s; }
                .stagger-delay-2 { animation-delay: 0.2s; }
                .stagger-delay-3 { animation-delay: 0.3s; }
                .stagger-delay-4 { animation-delay: 0.4s; }
            `}</style>
            
            <div className='fade-in-up'>
                <Title title='Latest Products' description={`Showing ${products.length < displayQuantity ? products.length : displayQuantity} of ${products.length} products`} href='/shop' />
            </div>
            
            <div className='mt-12 grid grid-cols-2 sm:flex flex-wrap gap-6 justify-between'>
                {latestProducts.map((product, index) => (
                    <div key={product.id || index} className={`stagger-animation stagger-delay-${index + 1}`}>
                        <ProductCard product={product} index={index} />
                    </div>
                ))}
            </div>
        </div>
    )
});

export default LatestProducts
