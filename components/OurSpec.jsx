import React, { useState, useEffect } from 'react'
import Title from './Title'
import { ourSpecsData } from '@/assets/assets'

const OurSpecs = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [hoveredCard, setHoveredCard] = useState(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        const element = document.getElementById('ourspecs-section');
        if (element) observer.observe(element);

        return () => observer.disconnect();
    }, []);

    const getCardColors = (accent, index) => {
        const colorMap = {
            '#05DF72': {
                bg: 'from-green-50 via-emerald-50 to-green-100',
                border: 'border-green-200',
                iconBg: 'bg-gradient-to-br from-green-400 to-emerald-500',
                glow: 'group-hover:shadow-green-200/50',
                particle: 'bg-green-400'
            },
            '#FF8904': {
                bg: 'from-orange-50 via-amber-50 to-orange-100', 
                border: 'border-orange-200',
                iconBg: 'bg-gradient-to-br from-orange-400 to-amber-500',
                glow: 'group-hover:shadow-orange-200/50',
                particle: 'bg-orange-400'
            },
            '#A684FF': {
                bg: 'from-purple-50 via-violet-50 to-purple-100',
                border: 'border-purple-200', 
                iconBg: 'bg-gradient-to-br from-purple-400 to-violet-500',
                glow: 'group-hover:shadow-purple-200/50',
                particle: 'bg-purple-400'
            }
        };
        return colorMap[accent] || colorMap['#05DF72'];
    };

    return (
        <div id="ourspecs-section" className='px-6 my-20 max-w-7xl mx-auto relative overflow-hidden'>
            {/* Background Decorations */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-10 right-1/4 w-32 h-32 bg-gradient-to-r from-green-200/20 to-blue-200/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 left-1/3 w-28 h-28 bg-gradient-to-r from-purple-200/20 to-pink-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
                <div className="absolute top-1/2 right-10 w-20 h-20 bg-gradient-to-r from-orange-200/20 to-yellow-200/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>

            {/* Custom Styles */}
            <style jsx>{`
                @keyframes float-up {
                    0% {
                        opacity: 0;
                        transform: translateY(50px) scale(0.8);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }
                @keyframes bounce-in {
                    0% {
                        transform: scale(0) rotate(-180deg);
                        opacity: 0;
                    }
                    50% {
                        transform: scale(1.2) rotate(-90deg);
                    }
                    100% {
                        transform: scale(1) rotate(0deg);
                        opacity: 1;
                    }
                }
                @keyframes shimmer {
                    0% {
                        transform: translateX(-100%) skewX(-15deg);
                    }
                    100% {
                        transform: translateX(200%) skewX(-15deg);
                    }
                }
                @keyframes particle-float {
                    0%, 100% {
                        transform: translateY(0px) rotate(0deg);
                    }
                    50% {
                        transform: translateY(-10px) rotate(180deg);
                    }
                }
                @keyframes glow-pulse {
                    0%, 100% {
                        box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
                    }
                    50% {
                        box-shadow: 0 0 40px rgba(59, 130, 246, 0.6), 0 0 60px rgba(59, 130, 246, 0.3);
                    }
                }
                .card-animate {
                    animation: float-up 0.8s ease-out;
                }
                .icon-animate {
                    animation: bounce-in 1s ease-out;
                }
                .spec-card {
                    position: relative;
                    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    backdrop-filter: blur(10px);
                    overflow: hidden;
                }
                .spec-card::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
                    transition: left 0.6s ease;
                }
                .spec-card:hover::before {
                    left: 100%;
                }
                .spec-card:hover {
                    transform: translateY(-12px) scale(1.03);
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
                }
                .floating-particles {
                    position: absolute;
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                    opacity: 0.6;
                    animation: particle-float 3s ease-in-out infinite;
                }
                .icon-container {
                    position: relative;
                    transition: all 0.3s ease;
                }
                .icon-container:hover {
                    animation: glow-pulse 1.5s ease-in-out infinite;
                }
            `}</style>

            <div className='relative z-10'>
                <Title 
                    visibleButton={false} 
                    title='Our Specifications' 
                    description="We offer top-tier service and convenience to ensure your shopping experience is smooth, secure and completely hassle-free." 
                />

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16'>
                    {ourSpecsData.map((spec, index) => {
                        const colors = getCardColors(spec.accent, index);
                        const isHovered = hoveredCard === index;
                        
                        return (
                            <div 
                                key={index}
                                className={`spec-card card-animate relative h-56 p-8 flex flex-col items-center justify-center text-center rounded-2xl border-2 group cursor-pointer bg-gradient-to-br ${colors.bg} ${colors.border} ${colors.glow} transition-all duration-500`}
                                style={{ 
                                    animationDelay: `${index * 0.2}s`,
                                    animationFillMode: 'both',
                                    opacity: isVisible ? 1 : 0,
                                    transform: isVisible ? 'translateY(0)' : 'translateY(50px)'
                                }}
                                onMouseEnter={() => setHoveredCard(index)}
                                onMouseLeave={() => setHoveredCard(null)}
                            >
                                {/* Floating Particles */}
                                <div className={`floating-particles ${colors.particle} top-4 right-8`} style={{ animationDelay: '0s' }}></div>
                                <div className={`floating-particles ${colors.particle} bottom-6 left-6`} style={{ animationDelay: '1s' }}></div>
                                <div className={`floating-particles ${colors.particle} top-1/3 right-4`} style={{ animationDelay: '2s' }}></div>
                                
                                {/* Icon */}
                                <div 
                                    className={`icon-container icon-animate absolute -top-6 ${colors.iconBg} text-white w-14 h-14 flex items-center justify-center rounded-2xl shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}
                                    style={{ 
                                        animationDelay: `${index * 0.2 + 0.3}s`,
                                        animationFillMode: 'both'
                                    }}
                                >
                                    <spec.icon size={24} className="drop-shadow-sm" />
                                    
                                    {/* Icon Glow Effect */}
                                    <div className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </div>

                                {/* Content */}
                                <div className="mt-4 space-y-4">
                                    <h3 className='text-slate-800 font-bold text-xl group-hover:text-slate-900 transition-colors duration-300'>
                                        {spec.title}
                                    </h3>
                                    <p className='text-sm text-slate-600 leading-relaxed group-hover:text-slate-700 transition-colors duration-300 px-2'>
                                        {spec.description}
                                    </p>
                                </div>

                                {/* Bottom Accent Line */}
                                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r opacity-50 group-hover:opacity-100 transition-opacity duration-300" style={{ background: `linear-gradient(90deg, ${spec.accent}40, ${spec.accent}, ${spec.accent}40)` }}></div>
                                
                                {/* Hover Glow */}
                                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ boxShadow: `0 0 30px ${spec.accent}20` }}></div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default OurSpecs
