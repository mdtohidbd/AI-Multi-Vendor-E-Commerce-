import Link from "next/link";

const Footer = () => {

    const MailIcon = () => (<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M14.6654 4.66699L8.67136 8.48499C8.46796 8.60313 8.23692 8.66536 8.0017 8.66536C7.76647 8.66536 7.53544 8.60313 7.33203 8.48499L1.33203 4.66699M2.66536 2.66699H13.332C14.0684 2.66699 14.6654 3.26395 14.6654 4.00033V12.0003C14.6654 12.7367 14.0684 13.3337 13.332 13.3337H2.66536C1.92898 13.3337 1.33203 12.7367 1.33203 12.0003V4.00033C1.33203 3.26395 1.92898 2.66699 2.66536 2.66699Z" stroke="#90A1B9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /> </svg>)
    const PhoneIcon = () => (<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M9.22003 11.045C9.35772 11.1082 9.51283 11.1227 9.65983 11.086C9.80682 11.0493 9.93692 10.9636 10.0287 10.843L10.2654 10.533C10.3896 10.3674 10.5506 10.233 10.7357 10.1404C10.9209 10.0479 11.125 9.99967 11.332 9.99967H13.332C13.6857 9.99967 14.0248 10.1402 14.2748 10.3902C14.5249 10.6402 14.6654 10.9794 14.6654 11.333V13.333C14.6654 13.6866 14.5249 14.0258 14.2748 14.2758C14.0248 14.5259 13.6857 14.6663 13.332 14.6663C10.1494 14.6663 7.09719 13.4021 4.84675 11.1516C2.59631 8.90119 1.33203 5.84894 1.33203 2.66634C1.33203 2.31272 1.47251 1.97358 1.72256 1.72353C1.9726 1.47348 2.31174 1.33301 2.66536 1.33301H4.66536C5.01899 1.33301 5.35812 1.47348 5.60817 1.72353C5.85822 1.97358 5.9987 2.31272 5.9987 2.66634V4.66634C5.9987 4.87333 5.9505 5.07749 5.85793 5.26263C5.76536 5.44777 5.63096 5.60881 5.46536 5.73301L5.15336 5.96701C5.03098 6.06046 4.94471 6.1934 4.90923 6.34324C4.87374 6.49308 4.89122 6.65059 4.9587 6.78901C5.86982 8.63959 7.36831 10.1362 9.22003 11.045Z" stroke="#90A1B9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /> </svg>)
    const MapPinIcon = () => (<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M13.3346 6.66634C13.3346 9.99501 9.64197 13.4617 8.40197 14.5323C8.28645 14.6192 8.14583 14.6662 8.0013 14.6662C7.85677 14.6662 7.71615 14.6192 7.60064 14.5323C6.36064 13.4617 2.66797 9.99501 2.66797 6.66634C2.66797 5.25185 3.22987 3.8953 4.23007 2.89511C5.23026 1.89491 6.58681 1.33301 8.0013 1.33301C9.41579 1.33301 10.7723 1.89491 11.7725 2.89511C12.7727 3.8953 13.3346 5.25185 13.3346 6.66634Z" stroke="#90A1B9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /> <path d="M8.0013 8.66634C9.10587 8.66634 10.0013 7.77091 10.0013 6.66634C10.0013 5.56177 9.10587 4.66634 8.0013 4.66634C6.89673 4.66634 6.0013 5.56177 6.0013 6.66634C6.0013 7.77091 6.89673 8.66634 8.0013 8.66634Z" stroke="#90A1B9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /> </svg>)
    const FacebookIcon = () => (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M14.9987 1.66699H12.4987C11.3936 1.66699 10.3338 2.10598 9.55242 2.88738C8.77102 3.66878 8.33203 4.72859 8.33203 5.83366V8.33366H5.83203V11.667H8.33203V18.3337H11.6654V11.667H14.1654L14.9987 8.33366H11.6654V5.83366C11.6654 5.61265 11.7532 5.40068 11.9094 5.2444C12.0657 5.08812 12.2777 5.00033 12.4987 5.00033H14.9987V1.66699Z" stroke="#90A1B9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /> </svg>)
    const InstagramIcon = () => (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M14.5846 5.41699H14.593M5.83464 1.66699H14.168C16.4692 1.66699 18.3346 3.53247 18.3346 5.83366V14.167C18.3346 16.4682 16.4692 18.3337 14.168 18.3337H5.83464C3.53345 18.3337 1.66797 16.4682 1.66797 14.167V5.83366C1.66797 3.53247 3.53345 1.66699 5.83464 1.66699ZM13.3346 9.47533C13.4375 10.1689 13.319 10.8772 12.9961 11.4995C12.6732 12.1218 12.1623 12.6265 11.536 12.9417C10.9097 13.2569 10.2 13.3667 9.50779 13.2553C8.81557 13.1439 8.1761 12.8171 7.68033 12.3213C7.18457 11.8255 6.85775 11.1861 6.74636 10.4938C6.63497 9.80162 6.74469 9.0919 7.05991 8.46564C7.37512 7.83937 7.87979 7.32844 8.50212 7.00553C9.12445 6.68261 9.83276 6.56415 10.5263 6.66699C11.2337 6.7719 11.8887 7.10154 12.3944 7.60725C12.9001 8.11295 13.2297 8.76789 13.3346 9.47533Z" stroke="#90A1B9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /> </svg>)
    const TwitterIcon = () => (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M18.3346 3.33368C18.3346 3.33368 17.7513 5.08368 16.668 6.16701C18.0013 14.5003 8.83464 20.5837 1.66797 15.8337C3.5013 15.917 5.33464 15.3337 6.66797 14.167C2.5013 12.917 0.417969 8.00034 2.5013 4.16701C4.33464 6.33368 7.16797 7.58368 10.0013 7.50034C9.2513 4.00034 13.3346 2.00034 15.8346 4.33368C16.7513 4.33368 18.3346 3.33368 18.3346 3.33368Z" stroke="#90A1B9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /> </svg>)
    const LinkedinIcon = () => (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M13.3346 6.66699C14.6607 6.66699 15.9325 7.19378 16.8702 8.13146C17.8079 9.06914 18.3346 10.3409 18.3346 11.667V17.5003H15.0013V11.667C15.0013 11.225 14.8257 10.801 14.5131 10.4885C14.2006 10.1759 13.7767 10.0003 13.3346 10.0003C12.8926 10.0003 12.4687 10.1759 12.1561 10.4885C11.8436 10.801 11.668 11.225 11.668 11.667V17.5003H8.33464V11.667C8.33464 10.3409 8.86142 9.06914 9.7991 8.13146C10.7368 7.19378 12.0086 6.66699 13.3346 6.66699Z" stroke="#90A1B9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /> <path d="M5.0013 7.50033H1.66797V17.5003H5.0013V7.50033Z" stroke="#90A1B9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /> <path d="M3.33464 5.00033C4.25511 5.00033 5.0013 4.25413 5.0013 3.33366C5.0013 2.41318 4.25511 1.66699 3.33464 1.66699C2.41416 1.66699 1.66797 2.41318 1.66797 3.33366C1.66797 4.25413 2.41416 5.00033 3.33464 5.00033Z" stroke="#90A1B9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /> </svg>)

    const linkSections = [
        {
            title: "PRODUCTS",
            links: [
                { text: "Earphones", path: '/', icon: null, type: 'link' },
                { text: "Headphones", path: '/', icon: null, type: 'link' },
                { text: "Smartphones", path: '/', icon: null, type: 'link' },
                { text: "Laptops", path: '/', icon: null, type: 'link' },
            ]
        },
        {
            title: "WEBSITE",
            links: [
                { text: "Home", path: '/', icon: null, type: 'link' },
                { text: "Privacy Policy", path: '/', icon: null, type: 'link' },
                { text: "Become Plus Member", path: '/pricing', icon: null, type: 'link' },
                { text: "Create Your Store", path: '/create-store', icon: null, type: 'link' },
            ]
        },
        {
            title: "CONTACT",
            links: [
                { text: "01794985731", path: 'tel:01794985731', icon: PhoneIcon, type: 'phone' },
                { text: "mdtohid262020@gmail.com", path: 'mailto:mdtohid262020@gmail.com', icon: MailIcon, type: 'email' },
                { text: "794 Francisco, 94102", path: 'https://maps.google.com/?q=794+Francisco+94102', icon: MapPinIcon, type: 'map' }
            ]
        }
    ];

    const socialIcons = [
        { icon: FacebookIcon, link: "https://www.facebook.com" },
        { icon: InstagramIcon, link: "https://www.instagram.com" },
        { icon: TwitterIcon, link: "https://twitter.com" },
        { icon: LinkedinIcon, link: "https://www.linkedin.com" },
    ]

    return (
        <footer className="mx-6 bg-gradient-to-br from-slate-50 via-white to-green-50/30 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-10 right-20 w-32 h-32 bg-green-500 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 left-10 w-28 h-28 bg-blue-500 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/3 w-20 h-20 bg-purple-500 rounded-full blur-2xl"></div>
            </div>
            
            {/* Custom CSS for animations */}
            <style jsx>{`
                @keyframes float {
                    0%, 100% {
                        transform: translateY(0px);
                    }
                    50% {
                        transform: translateY(-10px);
                    }
                }
                @keyframes pulse-glow {
                    0%, 100% {
                        box-shadow: 0 0 10px rgba(34, 197, 94, 0.4), 0 0 20px rgba(34, 197, 94, 0.1);
                    }
                    50% {
                        box-shadow: 0 0 20px rgba(34, 197, 94, 0.6), 0 0 30px rgba(34, 197, 94, 0.2);
                    }
                }
                @keyframes bounce-icon {
                    0%, 100% {
                        transform: translateY(0px) scale(1);
                    }
                    50% {
                        transform: translateY(-5px) scale(1.1);
                    }
                }
                @keyframes slide-in-up {
                    0% {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                @keyframes gradient-shift {
                    0%, 100% {
                        background-position: 0% 50%;
                    }
                    50% {
                        background-position: 100% 50%;
                    }
                }
                @keyframes shimmer {
                    0% {
                        transform: translateX(-100%);
                    }
                    100% {
                        transform: translateX(100%);
                    }
                }
                .card-hover {
                    position: relative;
                    transition: all 0.4s cubic-bezier(0.23, 1, 0.320, 1);
                    background: linear-gradient(145deg, rgba(255, 255, 255, 0.9), rgba(248, 250, 252, 0.8));
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(226, 232, 240, 0.5);
                    border-radius: 16px;
                    padding: 24px;
                    overflow: hidden;
                }
                .card-hover::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent);
                    transition: left 0.6s;
                }
                .card-hover:hover::before {
                    left: 100%;
                }
                .card-hover:hover {
                    transform: translateY(-8px) scale(1.02);
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(34, 197, 94, 0.2);
                    background: linear-gradient(145deg, rgba(255, 255, 255, 0.95), rgba(248, 250, 252, 0.9));
                }
                .contact-item {
                    position: relative;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 12px 16px;
                    margin: -12px -16px;
                    border-radius: 12px;
                    transition: all 0.3s cubic-bezier(0.23, 1, 0.320, 1);
                    overflow: hidden;
                }
                .contact-item::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
                    transition: left 0.5s;
                }
                .contact-item:hover::before {
                    left: 100%;
                }
                .phone-item:hover {
                    background: linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(16, 185, 129, 0.05));
                    color: #10b981;
                    transform: translateX(8px);
                    box-shadow: 0 4px 15px rgba(34, 197, 94, 0.2);
                }
                .email-item:hover {
                    background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(99, 102, 241, 0.05));
                    color: #3b82f6;
                    transform: translateX(8px);
                    box-shadow: 0 4px 15px rgba(59, 130, 246, 0.2);
                }
                .map-item:hover {
                    background: linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(245, 101, 101, 0.05));
                    color: #ef4444;
                    transform: translateX(8px);
                    box-shadow: 0 4px 15px rgba(239, 68, 68, 0.2);
                }
                .icon-bounce:hover {
                    animation: bounce-icon 0.6s ease-in-out;
                }
                .social-button {
                    position: relative;
                    transition: all 0.3s cubic-bezier(0.23, 1, 0.320, 1);
                    background: linear-gradient(145deg, rgba(255, 255, 255, 0.9), rgba(248, 250, 252, 0.7));
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(226, 232, 240, 0.5);
                    overflow: hidden;
                }
                .social-button::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: linear-gradient(45deg, rgba(34, 197, 94, 0.1), rgba(59, 130, 246, 0.1));
                    opacity: 0;
                    transition: opacity 0.3s;
                }
                .social-button:hover::before {
                    opacity: 1;
                }
                .social-button:hover {
                    transform: translateY(-3px) scale(1.1);
                    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
                    animation: pulse-glow 2s ease-in-out infinite;
                }
                .slide-up {
                    animation: slide-in-up 0.8s ease-out;
                }
                .floating {
                    animation: float 6s ease-in-out infinite;
                }
                .nav-link {
                    position: relative;
                    transition: all 0.3s ease;
                    padding: 8px 0;
                }
                .nav-link::after {
                    content: '';
                    position: absolute;
                    width: 0;
                    height: 2px;
                    bottom: 0;
                    left: 0;
                    background: linear-gradient(90deg, #22c55e, #3b82f6);
                    transition: width 0.3s ease;
                }
                .nav-link:hover::after {
                    width: 100%;
                }
                .nav-link:hover {
                    color: #22c55e;
                    transform: translateX(5px);
                }
                .brand-text {
                    background: linear-gradient(135deg, #1f2937, #22c55e, #3b82f6);
                    background-size: 300% 300%;
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    animation: gradient-shift 4s ease infinite;
                }
            `}</style>
            
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 py-12">
                    {/* Brand Section */}
                    <div className="lg:col-span-1 slide-up floating" style={{ animationDelay: '0.1s' }}>
                        <div className="card-hover">
                            <Link href="/" className="inline-block mb-6">
                                <h2 className="text-4xl font-bold brand-text">
                                    go<span className="text-green-600">cart</span><span className="text-5xl">.</span>
                                </h2>
                            </Link>
                            <p className="text-slate-600 text-sm leading-relaxed mb-6">
                                Welcome to gocart, your ultimate destination for the latest and smartest gadgets. From smartphones and smartwatches to essential accessories, we bring you the best in innovation — all in one place.
                            </p>
                            <div className="flex items-center gap-3">
                                {socialIcons.map((item, i) => (
                                    <Link 
                                        href={item.link} 
                                        key={i} 
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="social-button flex items-center justify-center w-12 h-12 rounded-full relative z-10"
                                        style={{ animationDelay: `${i * 0.1}s` }}
                                    >
                                        <item.icon className="relative z-10" />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                    
                    {/* Links Sections */}
                    {linkSections.map((section, sectionIndex) => (
                        <div key={sectionIndex} className="slide-up" style={{ animationDelay: `${(sectionIndex + 1) * 0.2}s` }}>
                            <div className="card-hover h-full">
                                <h3 className="font-bold text-slate-800 mb-6 text-lg relative">
                                    {section.title}
                                    <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-gradient-to-r from-green-500 to-blue-500 rounded-full"></div>
                                </h3>
                                <ul className="space-y-4">
                                    {section.links.map((link, i) => {
                                        const isContact = section.title === 'CONTACT';
                                        const linkProps = {
                                            href: link.path,
                                            ...(link.type === 'map' && {
                                                target: '_blank',
                                                rel: 'noopener noreferrer'
                                            })
                                        };
                                        
                                        return (
                                            <li key={i}>
                                                {isContact ? (
                                                    <a 
                                                        {...linkProps}
                                                        className={`contact-item ${
                                                            link.type === 'phone' ? 'phone-item' :
                                                            link.type === 'email' ? 'email-item' :
                                                            link.type === 'map' ? 'map-item' : ''
                                                        }`}
                                                        title={
                                                            link.type === 'phone' ? 'Call us now' :
                                                            link.type === 'email' ? 'Send us an email' :
                                                            link.type === 'map' ? 'View on Google Maps' : link.text
                                                        }
                                                    >
                                                        {link.icon && (
                                                            <div className="flex-shrink-0 relative z-10">
                                                                <link.icon className="icon-bounce" />
                                                            </div>
                                                        )}
                                                        <span className="text-sm relative z-10">{link.text}</span>
                                                    </a>
                                                ) : (
                                                    <Link 
                                                        href={link.path} 
                                                        className="nav-link block text-slate-600 text-sm"
                                                    >
                                                        {link.text}
                                                    </Link>
                                                )}
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
                
                {/* Bottom Section */}
                <div className="border-t border-gradient-to-r from-transparent via-slate-200 to-transparent pt-6 pb-4">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-sm text-slate-500 text-center md:text-left">
                            Copyright 2025 © <span className="font-semibold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">gocart</span> All Rights Reserved.
                        </p>
                        <div className="flex items-center gap-4 text-xs text-slate-400">
                            <Link href="/privacy" className="hover:text-green-600 transition-colors">Privacy Policy</Link>
                            <span>•</span>
                            <Link href="/terms" className="hover:text-green-600 transition-colors">Terms of Service</Link>
                            <span>•</span>
                            <Link href="/support" className="hover:text-green-600 transition-colors">Support</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;