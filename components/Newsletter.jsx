'use client'
import React, { useState } from 'react'
import { Mail, Check, X, Loader2 } from 'lucide-react'
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
        <div className='flex flex-col items-center mx-4 my-36'>
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
                @keyframes pulse-ring {
                    0% {
                        box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7);
                    }
                    70% {
                        box-shadow: 0 0 0 10px rgba(34, 197, 94, 0);
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
                .slide-in-up {
                    animation: slideInUp 0.8s ease-out;
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
                .gradient-button {
                    background: linear-gradient(-45deg, #22C55E, #16A34A, #15803D, #22C55E);
                    background-size: 400% 400%;
                    animation: gradient-shift 3s ease infinite;
                }
                .input-focus {
                    transition: all 0.3s ease;
                }
                .input-focus:focus {
                    transform: scale(1.02);
                    box-shadow: 0 0 0 4px rgba(34, 197, 94, 0.1);
                }
            `}</style>
            
            <div className='slide-in-up'>
                <Title 
                    title="Join Newsletter" 
                    description="Subscribe to get exclusive deals, new arrivals, and insider updates delivered straight to your inbox every week." 
                    visibleButton={false} 
                />
            </div>
            
            <form 
                onSubmit={handleSubmribe}
                className={`flex bg-white text-sm p-2 rounded-full w-full max-w-xl my-10 border-2 shadow-lg hover:shadow-xl transition-all duration-300 ${
                    error ? 'border-red-300 shake-animation' : 
                    isSubscribed ? 'border-green-300' : 
                    'border-gray-200 hover:border-green-300'
                } slide-in-up`}
                style={{ animationDelay: '0.2s' }}
            >
                <div className='relative flex-1'>
                    <input 
                        className={`input-focus w-full pl-12 pr-4 py-3 bg-transparent outline-none placeholder-gray-400 text-gray-700 ${
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
                        size={20} 
                        className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${
                            error ? 'text-red-400' : 
                            email ? 'text-green-500' : 
                            'text-gray-400'
                        }`} 
                    />
                </div>
                
                <button 
                    type="submit"
                    disabled={isLoading || isSubscribed}
                    className={`relative font-semibold text-white px-8 py-3 rounded-full transition-all duration-300 flex items-center gap-2 ${
                        isSubscribed 
                            ? 'bg-green-600 success-bounce' 
                            : isLoading 
                            ? 'bg-green-400 cursor-not-allowed' 
                            : 'gradient-button hover:scale-105 active:scale-95 pulse-ring'
                    }`}
                >
                    {isLoading ? (
                        <>
                            <Loader2 size={18} className='animate-spin' />
                            Subscribing...
                        </>
                    ) : isSubscribed ? (
                        <>
                            <Check size={18} />
                            Subscribed!
                        </>
                    ) : (
                        <>
                            <Mail size={18} />
                            Get Updates
                        </>
                    )}
                </button>
            </form>
            
            {/* Error message */}
            {error && (
                <div className='flex items-center gap-2 text-red-500 text-sm mt-2 slide-in-up'>
                    <X size={16} />
                    {error}
                </div>
            )}
            
            {/* Success message */}
            {isSubscribed && (
                <div className='flex items-center gap-2 text-green-600 text-sm mt-2 slide-in-up success-bounce'>
                    <Check size={16} />
                    Welcome to our newsletter! Check your email for confirmation.
                </div>
            )}
            
            {/* Additional info */}
            <div className='text-center text-gray-500 text-xs mt-4 max-w-md slide-in-up' style={{ animationDelay: '0.4s' }}>
                <p>🔒 Your email is safe with us. We respect your privacy and will never spam you.</p>
                <p className='mt-2'>💌 Unsubscribe anytime with just one click.</p>
            </div>
        </div>
    )
}

export default Newsletter