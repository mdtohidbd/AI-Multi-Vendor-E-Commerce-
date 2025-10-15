'use client'
import { assets } from '@/assets/assets'
import { ArrowRightIcon, ChevronRightIcon } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import CategoriesMarquee from './CategoriesMarquee'

const Hero = () => {

    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$'

    return (
        <div className='mx-6'>
            {/* Custom CSS for animations */}
            <style jsx>{`
                @keyframes gradient-shift {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                @keyframes float-up-down {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                }
                @keyframes pulse-scale {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.05); }
                }
                @keyframes rotate-slow {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                @keyframes slide-in-left {
                    0% { transform: translateX(-50px); opacity: 0; }
                    100% { transform: translateX(0); opacity: 1; }
                }
                @keyframes slide-in-right {
                    0% { transform: translateX(50px); opacity: 0; }
                    100% { transform: translateX(0); opacity: 1; }
                }
                @keyframes fade-in-up {
                    0% { transform: translateY(30px); opacity: 0; }
                    100% { transform: translateY(0); opacity: 1; }
                }
                .gradient-bg-animated {
                    background: linear-gradient(-45deg, #A7F3D0, #86EFAC, #6EE7B7, #34D399);
                    background-size: 400% 400%;
                    animation: gradient-shift 6s ease infinite;
                }
                .gradient-bg-animated-orange {
                    background: linear-gradient(-45deg, #FED7AA, #FDBA74, #FB923C, #F97316);
                    background-size: 400% 400%;
                    animation: gradient-shift 8s ease infinite;
                }
                .gradient-bg-animated-blue {
                    background: linear-gradient(-45deg, #BFDBFE, #93C5FD, #60A5FA, #3B82F6);
                    background-size: 400% 400%;
                    animation: gradient-shift 7s ease infinite;
                }
                .float-animation {
                    animation: float-up-down 3s ease-in-out infinite;
                }
                .pulse-animation {
                    animation: pulse-scale 2s ease-in-out infinite;
                }
                .slide-in-left {
                    animation: slide-in-left 0.8s ease-out;
                }
                .slide-in-right {
                    animation: slide-in-right 0.8s ease-out;
                }
                .fade-in-up {
                    animation: fade-in-up 1s ease-out;
                }
                .delay-100 { animation-delay: 0.1s; }
                .delay-200 { animation-delay: 0.2s; }
                .delay-300 { animation-delay: 0.3s; }
                .delay-400 { animation-delay: 0.4s; }
                .delay-500 { animation-delay: 0.5s; }
            `}</style>
            
            <div className='flex max-xl:flex-col gap-8 max-w-7xl mx-auto my-10'>
                {/* Main Hero Section */}
                <div className='relative flex-1 flex flex-col gradient-bg-animated rounded-3xl xl:min-h-100 group overflow-hidden'>
                    {/* Floating background elements */}
                    <div className='absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl pulse-animation'></div>
                    <div className='absolute bottom-20 left-20 w-16 h-16 bg-white/20 rounded-full blur-lg float-animation' style={{animationDelay: '1s'}}></div>
                    <div className='absolute top-1/2 right-20 w-12 h-12 bg-white/15 rounded-full blur-md float-animation' style={{animationDelay: '2s'}}></div>
                    
                    <div className='p-5 sm:p-16 relative z-10'>
                        <div className='inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm text-green-700 pr-4 p-1 rounded-full text-xs sm:text-sm slide-in-left border border-white/30'>
                            <span className='bg-green-600 px-3 py-1 max-sm:ml-1 rounded-full text-white text-xs pulse-animation'>NEWS</span> 
                            Free Shipping on Orders Above $50! 
                            <ChevronRightIcon className='group-hover:ml-2 transition-all duration-300' size={16} />
                        </div>
                        <h2 className='text-3xl sm:text-5xl leading-[1.2] my-3 font-medium bg-gradient-to-r from-slate-700 via-slate-800 to-green-600 bg-clip-text text-transparent max-w-xs sm:max-w-md fade-in-up delay-200'>
                            Gadgets you'll love. Prices you'll trust.
                        </h2>
                        <div className='text-slate-800 text-sm font-medium mt-4 sm:mt-8 fade-in-up delay-300'>
                            <p className='opacity-80'>Starts from</p>
                            <p className='text-3xl font-bold bg-gradient-to-r from-slate-800 to-green-600 bg-clip-text text-transparent'>
                                {currency}4.90
                            </p>
                        </div>
                        <button className='bg-slate-800 text-white text-sm py-2.5 px-7 sm:py-5 sm:px-12 mt-4 sm:mt-10 rounded-xl hover:bg-slate-900 hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg hover:shadow-xl fade-in-up delay-400 relative overflow-hidden group'>
                            <span className='relative z-10'>LEARN MORE</span>
                            <div className='absolute inset-0 bg-gradient-to-r from-green-600 to-green-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left'></div>
                        </button>
                    </div>
                    <Image className='sm:absolute bottom-0 right-0 md:right-10 w-full sm:max-w-sm float-animation slide-in-right delay-500' src={assets.hero_model_img} alt="" />
                </div>
                
                {/* Side Cards */}
                <div className='flex flex-col md:flex-row xl:flex-col gap-5 w-full xl:max-w-sm text-sm text-slate-600'>
                    {/* Best Products Card */}
                    <div className='flex-1 flex items-center justify-between w-full gradient-bg-animated-orange rounded-3xl p-6 px-8 group hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl overflow-hidden relative fade-in-up delay-300'>
                        {/* Background decorative elements */}
                        <div className='absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full blur-sm pulse-animation'></div>
                        <div className='absolute bottom-4 left-4 w-6 h-6 bg-white/15 rounded-full blur-sm float-animation'></div>
                        
                        <div className='relative z-10'>
                            <p className='text-3xl font-bold bg-gradient-to-r from-slate-800 to-orange-600 bg-clip-text text-transparent max-w-40'>Best products</p>
                            <p className='flex items-center gap-1 mt-4 hover:gap-3 transition-all duration-300 cursor-pointer'>
                                View more 
                                <ArrowRightIcon className='group-hover:translate-x-2 transition-all duration-300' size={18} /> 
                            </p>
                        </div>
                        <Image className='w-35 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 float-animation' style={{animationDelay: '1s'}} src={assets.hero_product_img1} alt="" />
                    </div>
                    
                    {/* Discounts Card */}
                    <div className='flex-1 flex items-center justify-between w-full gradient-bg-animated-blue rounded-3xl p-6 px-8 group hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl overflow-hidden relative fade-in-up delay-400'>
                        {/* Background decorative elements */}
                        <div className='absolute top-6 left-6 w-10 h-10 bg-white/20 rounded-full blur-md pulse-animation' style={{animationDelay: '1s'}}></div>
                        <div className='absolute bottom-8 right-8 w-4 h-4 bg-white/25 rounded-full blur-sm float-animation' style={{animationDelay: '0.5s'}}></div>
                        
                        <div className='relative z-10'>
                            <p className='text-3xl font-bold bg-gradient-to-r from-slate-800 to-blue-600 bg-clip-text text-transparent max-w-40'>20% discounts</p>
                            <p className='flex items-center gap-1 mt-4 hover:gap-3 transition-all duration-300 cursor-pointer'>
                                View more 
                                <ArrowRightIcon className='group-hover:translate-x-2 transition-all duration-300' size={18} /> 
                            </p>
                        </div>
                        <Image className='w-35 group-hover:scale-110 group-hover:-rotate-3 transition-all duration-300 float-animation' style={{animationDelay: '1.5s'}} src={assets.hero_product_img2} alt="" />
                    </div>
                </div>
            </div>
            <CategoriesMarquee />
        </div>
    )
}

export default Hero