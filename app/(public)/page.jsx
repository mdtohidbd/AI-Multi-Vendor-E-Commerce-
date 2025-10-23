'use client'
import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import Hero from "@/components/Hero";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";

// Dynamically import heavy components for better code splitting
const LatestProducts = dynamic(() => import("@/components/LatestProducts"), {
    loading: () => (
        <div className='px-6 my-30 max-w-6xl mx-auto'>
            <div className='mt-12 grid grid-cols-2 sm:flex flex-wrap gap-6 justify-between'>
                {[...Array(4)].map((_, i) => <ProductCardSkeleton key={i} />)}
            </div>
        </div>
    ),
    ssr: true
});

const BestSelling = dynamic(() => import("@/components/BestSelling"), {
    loading: () => (
        <div className='px-6 my-30 max-w-6xl mx-auto'>
            <div className='mt-12 grid grid-cols-2 sm:flex flex-wrap gap-6 xl:gap-12'>
                {[...Array(8)].map((_, i) => <ProductCardSkeleton key={i} />)}
            </div>
        </div>
    ),
    ssr: true
});

const OurSpecs = dynamic(() => import("@/components/OurSpec"), {
    ssr: true
});

const Newsletter = dynamic(() => import("@/components/Newsletter"), {
    ssr: true
});

export default function Home() {
    return (
        <div>
            <Hero />
            <Suspense fallback={<div className='h-96 flex items-center justify-center'><div className='animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900'></div></div>}>
                <LatestProducts />
            </Suspense>
            <Suspense fallback={<div className='h-96'></div>}>
                <BestSelling />
            </Suspense>
            <Suspense fallback={<div className='h-64'></div>}>
                <OurSpecs />
            </Suspense>
            <Suspense fallback={<div className='h-64'></div>}>
                <Newsletter />
            </Suspense>
        </div>
    );
}
