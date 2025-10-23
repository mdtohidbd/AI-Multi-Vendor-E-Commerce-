'use client'
import React, { useState } from 'react'
import { Mail, Check, X, Loader2, Heart, Shield, Sparkles, Zap, Gift, Star, Bell } from 'lucide-react'
import Title from './Title'
import toast from 'react-hot-toast'

const Newsletter = () => {
    const [email, setEmail] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isSubscribed, setIsSubscribed] = useState(false)
    const [error, setError] = useState('')

    // Email validation function
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email)
    }

    // Handle form submission
    const handleSubmribe = async (e) => {
        e.preventDefault()
        setError('')

        // Validation
        if (!email.trim()) {
            setError('Please enter your email address')
            toast.error('Please enter your email address')
            return
        }

        if (!validateEmail(email)) {
            setError('Please enter a valid email address')
            toast.error('Please enter a valid email address')
            return
        }

        setIsLoading(true)

        try {
            // Simulate API call - Replace with your actual newsletter subscription logic
            await new Promise(resolve => setTimeout(resolve, 2000))
            
            // Success simulation
            setIsSubscribed(true)
            toast.success('🎉 Successfully subscribed to newsletter!')
            
            // Reset after 3 seconds
            setTimeout(() => {
                setIsSubscribed(false)
                setEmail('')
            }, 3000)
            
        } catch (error) {
            toast.error('Failed to subscribe. Please try again.')
            setError('Failed to subscribe. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className='relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-green-50 flex items-center justify-center py-20'>
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-200 rounded-full opacity-20 animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-purple-200 rounded-full opacity-10 animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>

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
                @keyframes pulse-ring {
                    0% {
                        box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7);
                    }
                    70% {
                        box-shadow: 0 0 0 20px rgba(34, 197, 94, 0);
                    }
                    100% {
                        box-shadow: 0 0 0 0 rgba(34, 197, 94, 0);
                    }
                }
                @keyframes success-bounce {
                    0%, 100% {
                        transform: scale(1);
                    }
                    50% {
                        transform: scale(1.1);
                    }
                }
                @keyframes shake {
                    0%, 100% {
                        transform: translateX(0);
                    }
                    25% {
                        transform: translateX(-5px);
                    }
                    75% {
                        transform: translateX(5px);
                    }
                }
                @keyframes gradient-shift {
                    0% {
                        background-position: 0% 50%;
                    }
                    50% {
                        background-position: 100% 50%;
                    }
                    100% {
                        background-position: 0% 50%;
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
                @keyframes shimmer {
                    0% {
                        background-position: -200px 0;
                    }
                    100% {
                        background-position: calc(200px + 100%) 0;
                    }
                }
                @keyframes rotate {
                    0% {
                        transform: rotate(0deg);
                    }
                    100% {
                        transform: rotate(360deg);
                    }
                }
                .slide-in-up {
                    animation: slideInUp 0.8s ease-out;
                }
                .slide-in-left {
                    animation: slideInLeft 0.8s ease-out;
                }
                .slide-in-right {
                    animation: slideInRight 0.8s ease-out;
                }
                .fade-in {
                    animation: fadeIn 1s ease-out;
                }
                .bounce-animation {
                    animation: bounce 2s infinite;
                }
                .pulse-ring {
                    animation: pulse-ring 2s infinite;
                }
                .success-bounce {
                    animation: success-bounce 0.6s ease-in-out;
                }
                .shake-animation {
                    animation: shake 0.5s ease-in-out;
                }
                .float-animation {
                    animation: float 3s ease-in-out infinite;
                }
                .glow-animation {
                    animation: glow 2s ease-in-out infinite;
                }
                .gradient-button {
                    background: linear-gradient(-45deg, #22C55E, #16A34A, #15803D, #22C55E);
                    background-size: 400% 400%;
                    animation: gradient-shift 3s ease infinite;
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
                .input-focus {
                    transition: all 0.3s ease;
                }
                .input-focus:focus {
                    transform: scale(1.02);
                    box-shadow: 0 0 0 4px rgba(34, 197, 94, 0.1);
                }
                .newsletter-card {
                    backdrop-filter: blur(10px);
                    background: rgba(255, 255, 255, 0.9);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                }
            `}</style>
            
            <div className="relative z-10 w-full max-w-4xl mx-4">
                {/* Main Newsletter Card */}
                <div className="newsletter-card rounded-3xl shadow-2xl overflow-hidden">
                    <div className="p-12">
                        {/* Header Section */}
                        <div className="slide-in-up text-center mb-12">
                            <div className="flex items-center justify-center gap-3 mb-6">
                                <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl shadow-lg">
                                    <Bell className="text-white" size={28} />
                                </div>
                                <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                                    Join Newsletter
                                </h2>
                            </div>
                            <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                                Subscribe to get exclusive deals, new arrivals, and insider updates delivered straight to your inbox every week.
                            </p>
                        </div>

                        {/* Benefits Section */}
                        <div className="slide-in-left mb-12">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl">
                                    <div className="p-2 bg-blue-500 rounded-xl">
                                        <Gift className="text-white" size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-slate-800">Exclusive Deals</h4>
                                        <p className="text-sm text-slate-600">Special offers just for you</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-2xl">
                                    <div className="p-2 bg-green-500 rounded-xl">
                                        <Sparkles className="text-white" size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-slate-800">New Arrivals</h4>
                                        <p className="text-sm text-slate-600">Be the first to know</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-2xl">
                                    <div className="p-2 bg-purple-500 rounded-xl">
                                        <Zap className="text-white" size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-slate-800">Insider Updates</h4>
                                        <p className="text-sm text-slate-600">Latest news & trends</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Newsletter Form */}
                        <div className="slide-in-up">
                            <form 
                                onSubmit={handleSubmribe}
                                className={`flex bg-white text-sm p-3 rounded-2xl w-full max-w-2xl mx-auto border-2 shadow-xl hover:shadow-2xl transition-all duration-300 ${
                                    error ? 'border-red-300 shake-animation' : 
                                    isSubscribed ? 'border-green-300' : 
                                    'border-slate-200 hover:border-green-300'
                                }`}
                            >
                                <div className='relative flex-1'>
                                    <input 
                                        className={`input-focus w-full pl-14 pr-4 py-4 bg-transparent outline-none placeholder-slate-400 text-slate-700 text-lg ${
                                            error ? 'text-red-600' : ''
                                        }`}
                                        type="email" 
                                        placeholder='Enter your email address'
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value)
                                            if (error) setError('')
                                        }}
                                        disabled={isLoading || isSubscribed}
                                    />
                                    <Mail 
                                        size={24} 
                                        className={`absolute left-5 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${
                                            error ? 'text-red-400' : 
                                            email ? 'text-green-500' : 
                                            'text-slate-400'
                                        }`} 
                                    />
                                </div>
                                
                                <button 
                                    type="submit"
                                    disabled={isLoading || isSubscribed}
                                    className={`relative font-bold text-white px-8 py-4 rounded-xl transition-all duration-300 flex items-center gap-3 text-lg ${
                                        isSubscribed 
                                            ? 'bg-green-600 success-bounce' 
                                            : isLoading 
                                            ? 'bg-green-400 cursor-not-allowed' 
                                            : 'gradient-button hover:scale-105 active:scale-95 pulse-ring'
                                    }`}
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 size={20} className='animate-spin' />
                                            Subscribing...
                                        </>
                                    ) : isSubscribed ? (
                                        <>
                                            <Check size={20} />
                                            Subscribed!
                                        </>
                                    ) : (
                                        <>
                                            <Mail size={20} />
                                            Get Updates
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                        
                        {/* Status Messages */}
                        <div className="mt-6">
                            {/* Error message */}
                            {error && (
                                <div className='flex items-center justify-center gap-2 text-red-500 text-sm slide-in-up'>
                                    <X size={18} />
                                    {error}
                                </div>
                            )}
                            
                            {/* Success message */}
                            {isSubscribed && (
                                <div className='flex items-center justify-center gap-2 text-green-600 text-sm slide-in-up success-bounce'>
                                    <Check size={18} />
                                    Welcome to our newsletter! Check your email for confirmation.
                                </div>
                            )}
                        </div>

                        {/* Privacy Information */}
                        <div className='slide-in-up mt-8'>
                            <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-slate-500 text-sm">
                                <div className="flex items-center gap-2">
                                    <div className="p-2 bg-orange-100 rounded-lg">
                                        <Shield className="text-orange-500" size={16} />
                                    </div>
                                    <span>Your email is safe with us. We respect your privacy and will never spam you.</span>
                                </div>
                                
                                <div className="flex items-center gap-2">
                                    <div className="p-2 bg-pink-100 rounded-lg">
                                        <Heart className="text-pink-500" size={16} />
                                    </div>
                                    <span>Unsubscribe anytime with just one click.</span>
                                </div>
                            </div>
                        </div>

                        {/* Floating Elements */}
                        <div className="absolute -top-4 -right-4 w-8 h-8 bg-green-500 rounded-full opacity-20 float-animation"></div>
                        <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-blue-500 rounded-full opacity-20 float-animation" style={{ animationDelay: '1s' }}></div>
                        <div className="absolute top-1/2 -left-8 w-4 h-4 bg-purple-500 rounded-full opacity-20 float-animation" style={{ animationDelay: '2s' }}></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Newsletter