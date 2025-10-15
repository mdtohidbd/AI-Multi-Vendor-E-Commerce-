'use client'
import { PackageIcon, Search, ShoppingCart, Phone, Mail, MapPin, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useUser ,useClerk, UserButton} from '@clerk/nextjs'

const Navbar = () => {

    const {user} = useUser();
    const {openSignIn} = useClerk();

    const router = useRouter();

    const [search, setSearch] = useState('')
    const [showContactDropdown, setShowContactDropdown] = useState(false)
    const contactRef = useRef(null)
    const cartCount = useSelector(state => state.cart.total)

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (contactRef.current && !contactRef.current.contains(event.target)) {
                setShowContactDropdown(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const handleSearch = (e) => {
        e.preventDefault()
        router.push(`/shop?search=${search}`)
    }

    return (
        <nav className="relative bg-white">
            {/* Custom CSS for animations */}
            <style jsx>{`
                @keyframes slideDown {
                    0% {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                @keyframes pulse-contact {
                    0%, 100% {
                        box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7);
                    }
                    70% {
                        box-shadow: 0 0 0 10px rgba(34, 197, 94, 0);
                    }
                }
                @keyframes bounce-icon {
                    0%, 100% {
                        transform: translateY(0);
                    }
                    50% {
                        transform: translateY(-3px);
                    }
                }
                .contact-dropdown {
                    animation: slideDown 0.3s ease-out;
                }
                .contact-button {
                    transition: all 0.3s ease;
                }
                .contact-button:hover {
                    background: linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(16, 185, 129, 0.05));
                    border-radius: 8px;
                    transform: translateY(-1px);
                }
                .contact-item {
                    transition: all 0.2s ease;
                }
                .contact-item:hover {
                    background: rgba(34, 197, 94, 0.05);
                    transform: translateX(4px);
                }
                .contact-icon {
                    transition: all 0.2s ease;
                }
                .contact-item:hover .contact-icon {
                    animation: bounce-icon 0.6s ease-in-out;
                }
                .pulse-button {
                    animation: pulse-contact 2s infinite;
                }
            `}</style>
            
            <div className="mx-6">
                <div className="flex items-center justify-between max-w-7xl mx-auto py-4  transition-all">

                    <Link href="/" className="relative text-4xl font-semibold text-slate-700 hover:text-green-600 transition-colors duration-300">
                        <span className="text-green-600">go</span>cart<span className="text-green-600 text-5xl leading-0">.</span>
                        <p className="absolute text-xs font-semibold -top-1 -right-8 px-3 p-0.5 rounded-full flex items-center gap-2 text-white bg-green-500 hover:bg-green-600 transition-colors">
                            plus
                        </p>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden sm:flex items-center gap-4 lg:gap-8 text-slate-600">
                        <Link href="/" className="hover:text-green-600 transition-colors duration-300">Home</Link>
                        <Link href="/shop" className="hover:text-green-600 transition-colors duration-300">Shop</Link>
                        <Link href="/" className="hover:text-green-600 transition-colors duration-300">About</Link>
                        
                        {/* Contact Dropdown */}
                        <div className="relative" ref={contactRef}>
                            <button 
                                onClick={() => setShowContactDropdown(!showContactDropdown)}
                                className={`contact-button flex items-center gap-1 px-3 py-2 hover:text-green-600 transition-all duration-300 ${showContactDropdown ? 'text-green-600' : ''}`}
                            >
                                Contact
                                <ChevronDown 
                                    size={16} 
                                    className={`transition-transform duration-300 ${showContactDropdown ? 'rotate-180' : ''}`} 
                                />
                            </button>
                            
                            {showContactDropdown && (
                                <div className="contact-dropdown absolute top-full left-0 mt-2 w-72 bg-white rounded-xl shadow-2xl border border-gray-100 py-4 z-50">
                                    {/* Contact Header */}
                                    <div className="px-4 pb-3 border-b border-gray-100">
                                        <h3 className="font-semibold text-gray-800 mb-1">Get in Touch</h3>
                                        <p className="text-sm text-gray-500">We'd love to hear from you!</p>
                                    </div>
                                    
                                    {/* Contact Options */}
                                    <div className="py-2">
                                        <a 
                                            href="tel:01794985731"
                                            className="contact-item flex items-center gap-3 px-4 py-3 text-gray-700 hover:text-green-600"
                                            title="Call us now"
                                        >
                                            <div className="contact-icon flex items-center justify-center w-8 h-8 bg-green-100 rounded-full">
                                                <Phone size={16} className="text-green-600" />
                                            </div>
                                            <div>
                                                <p className="font-medium">Call Us</p>
                                                <p className="text-sm text-gray-500">01794985731</p>
                                            </div>
                                        </a>
                                        
                                        <a 
                                            href="mailto:mdtohid262020@gmail.com"
                                            className="contact-item flex items-center gap-3 px-4 py-3 text-gray-700 hover:text-blue-600"
                                            title="Send us an email"
                                        >
                                            <div className="contact-icon flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full">
                                                <Mail size={16} className="text-blue-600" />
                                            </div>
                                            <div>
                                                <p className="font-medium">Email Us</p>
                                                <p className="text-sm text-gray-500">mdtohid262020@gmail.com</p>
                                            </div>
                                        </a>
                                        
                                        <a 
                                            href="https://maps.google.com/?q=794+Francisco+94102"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="contact-item flex items-center gap-3 px-4 py-3 text-gray-700 hover:text-red-600"
                                            title="View on Google Maps"
                                        >
                                            <div className="contact-icon flex items-center justify-center w-8 h-8 bg-red-100 rounded-full">
                                                <MapPin size={16} className="text-red-600" />
                                            </div>
                                            <div>
                                                <p className="font-medium">Visit Us</p>
                                                <p className="text-sm text-gray-500">794 Francisco, 94102</p>
                                            </div>
                                        </a>
                                    </div>
                                    
                                    {/* Quick Action */}
                                    <div className="px-4 pt-3 border-t border-gray-100">
                                        <a 
                                            href="tel:01794985731"
                                            className="pulse-button w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-2.5 px-4 rounded-lg font-medium transition-colors duration-300"
                                        >
                                            <Phone size={16} />
                                            Call Now
                                        </a>
                                    </div>
                                </div>
                            )}
                        </div>

                        <form onSubmit={handleSearch} className="hidden xl:flex items-center w-xs text-sm gap-2 bg-slate-100 px-4 py-3 rounded-full">
                            <Search size={18} className="text-slate-600" />
                            <input className="w-full bg-transparent outline-none placeholder-slate-600" type="text" placeholder="Search products" value={search} onChange={(e) => setSearch(e.target.value)} required />
                        </form>

                        <Link href="/cart" className="relative flex items-center gap-2 text-slate-600">
                            <ShoppingCart size={18} />
                            Cart
                            <button className="absolute -top-1 left-3 text-[8px] text-white bg-slate-600 size-3.5 rounded-full">{cartCount}</button>
                        </Link>


                        {
                            !user ? (
                                <button onClick={openSignIn} className="px-8 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full">
                            Login
                        </button>
                            ) : (
                                <UserButton>
                                    <UserButton.MenuItems>
                                        <UserButton.Action labelIcon={<PackageIcon size={16}/>} label="My Orders " onClick={()=> router.push('/orders')}/>
                                    </UserButton.MenuItems>
                                </UserButton>
                            )
                        }

                        

                    </div>

                    {/* Mobile User Button  */}
                    <div className="sm:hidden">

                    { user ? (
                        <div>

                                <UserButton>
                                    <UserButton.MenuItems>
                                        <UserButton.Action labelIcon={<ShoppingCart size={16}/>} label="Cart " onClick={()=> router.push('/cart')}/>
                                    </UserButton.MenuItems>
                                </UserButton>
                                 <UserButton>
                                    <UserButton.MenuItems>
                                        <UserButton.Action labelIcon={<PackageIcon size={16}/>} label="My Orders " onClick={()=> router.push('/orders')}/>
                                    </UserButton.MenuItems>
                                </UserButton>


                        </div>
                    ) : (

                        <button onClick={openSignIn}   className="px-7 py-1.5 bg-indigo-500 hover:bg-indigo-600 text-sm transition text-white rounded-full">
                            Login
                        </button>

                    )

                    }                       
                    </div>
                </div>
            </div>
            <hr className="border-gray-300" />
        </nav>
    )
}

export default Navbar