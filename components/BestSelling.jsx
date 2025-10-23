'use client'
import React, { useMemo } from 'react'
import Title from './Title'
import ProductCard from './ProductCard'
import { useSelector } from 'react-redux'

const BestSelling = React.memo(() => {

    const displayQuantity = 8
    const products = useSelector(state => state.product.list)
    
    // Memoize sorted products to prevent re-sorting on every render
    const bestSellingProducts = useMemo(() => {
        return products
            .slice()
            .sort((a, b) => b.rating.length - a.rating.length)
            .slice(0, displayQuantity);
    }, [products, displayQuantity]);

    return (
        <div className='px-6 my-30 max-w-6xl mx-auto'>
            <Title title='Best Selling' description={`Showing ${products.length < displayQuantity ? products.length : displayQuantity} of ${products.length} products`} href='/shop' />
            <div className='mt-12 grid grid-cols-2 sm:flex flex-wrap gap-6 xl:gap-12'>
                {bestSellingProducts.map((product, index) => (
                    <ProductCard key={product.id || index} product={product} index={index} />
                ))}
            </div>
        </div>
    )
});

export default BestSelling
