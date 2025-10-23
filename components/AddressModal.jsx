'use client'
import { XIcon, MapPin, User, Mail, Phone, Home, Building, Globe, Plus, CheckCircle, Sparkles, Zap } from "lucide-react"
import { useState } from "react"
import { toast } from "react-hot-toast"
import { useDispatch } from "react-redux"
import { addAddress } from "@/lib/features/address/addressSlice"

const AddressModal = ({ setShowAddressModal }) => {

    const dispatch = useDispatch();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [address, setAddress] = useState({
        name: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zip: '',
        country: '',
        phone: '',
        clientType: 'individual', // individual, business, organization
        addressType: 'home', // home, office, warehouse, other
        notes: ''
    })

    // Predefined client types and their default locations
    const clientTypes = [
        { value: 'individual', label: 'Individual Client', icon: User, color: 'blue' },
        { value: 'business', label: 'Business Client', icon: Building, color: 'green' },
        { value: 'organization', label: 'Organization', icon: Globe, color: 'purple' }
    ]

    const addressTypes = [
        { value: 'home', label: 'Home Address', icon: Home, color: 'blue' },
        { value: 'office', label: 'Office Address', icon: Building, color: 'green' },
        { value: 'warehouse', label: 'Warehouse', icon: Building, color: 'orange' },
        { value: 'other', label: 'Other', icon: MapPin, color: 'gray' }
    ]

    // Default locations for different client types
    const defaultLocations = {
        individual: {
            city: 'Dhaka',
            state: 'Dhaka',
            country: 'Bangladesh',
            zip: '1000'
        },
        business: {
            city: 'Chittagong',
            state: 'Chittagong',
            country: 'Bangladesh',
            zip: '4000'
        },
        organization: {
            city: 'Sylhet',
            state: 'Sylhet',
            country: 'Bangladesh',
            zip: '3100'
        }
    }

    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setAddress({
            ...address,
            [name]: value
        })
    }

    const handleClientTypeChange = (clientType) => {
        const defaultLocation = defaultLocations[clientType];
        setAddress({
            ...address,
            clientType,
            city: defaultLocation.city,
            state: defaultLocation.state,
            country: defaultLocation.country,
            zip: defaultLocation.zip
        });
    }

    const handleAddressTypeChange = (addressType) => {
        setAddress({
            ...address,
            addressType
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (isSubmitting) return;
        
        setIsSubmitting(true);

        try {
            const response = await fetch('/api/address', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(address)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to save address');
            }

            // Add address to Redux store
            dispatch(addAddress(data.address));

            toast.success('Address added successfully!');
            setShowAddressModal(false);
        } catch (error) {
            console.error('Address save error:', error);
            toast.error(error.message || 'Failed to save address');
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm h-screen flex items-center justify-center p-4">
            <form onSubmit={handleSubmit} className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden">
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
                    @keyframes fadeIn {
                        0% {
                            opacity: 0;
                        }
                        100% {
                            opacity: 1;
                        }
                    }
                    @keyframes pulse {
                        0%, 100% {
                            transform: scale(1);
                        }
                        50% {
                            transform: scale(1.05);
                        }
                    }
                    @keyframes bounce {
                        0%, 100% {
                            transform: translateY(0);
                        }
                        50% {
                            transform: translateY(-5px);
                        }
                    }
                    .slide-in-up {
                        animation: slideInUp 0.6s ease-out;
                    }
                    .fade-in {
                        animation: fadeIn 0.8s ease-out;
                    }
                    .pulse-animation {
                        animation: pulse 2s infinite;
                    }
                    .bounce-animation {
                        animation: bounce 2s infinite;
                    }
                `}</style>
                
                {/* Header */}
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-white/20 rounded-2xl">
                                <MapPin className="text-white" size={24} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-white">Add New Address</h2>
                                <p className="text-green-100 text-sm">Choose client type for different locations</p>
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={() => !isSubmitting && setShowAddressModal(false)}
                            className="p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-xl transition-all duration-300"
                        >
                            <XIcon size={24} />
                        </button>
                    </div>
                </div>
                
                <div className="p-8 space-y-8">
                    {/* Client Type Selection */}
                    <div className="slide-in-up">
                        <div className="flex items-center gap-2 mb-4">
                            <User className="text-green-600" size={20} />
                            <h3 className="text-lg font-semibold text-slate-800">Client Type</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {clientTypes.map((type) => {
                                const IconComponent = type.icon;
                                return (
                                    <div
                                        key={type.value}
                                        onClick={() => handleClientTypeChange(type.value)}
                                        className={`p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 hover:scale-105 ${
                                            address.clientType === type.value
                                                ? 'border-green-500 bg-green-50 shadow-lg'
                                                : 'border-slate-200 hover:border-slate-300'
                                        }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`p-2 rounded-xl ${
                                                address.clientType === type.value ? 'bg-green-100' : 'bg-slate-100'
                                            }`}>
                                                <IconComponent className={`${
                                                    address.clientType === type.value ? 'text-green-600' : 'text-slate-600'
                                                }`} size={20} />
                                            </div>
                                            <div>
                                                <p className={`font-medium ${
                                                    address.clientType === type.value ? 'text-green-800' : 'text-slate-700'
                                                }`}>
                                                    {type.label}
                                                </p>
                                                <p className="text-xs text-slate-500">
                                                    {type.value === 'individual' && 'Personal delivery address'}
                                                    {type.value === 'business' && 'Business delivery address'}
                                                    {type.value === 'organization' && 'Organization delivery address'}
                                                </p>
                                            </div>
                                            {address.clientType === type.value && (
                                                <CheckCircle className="text-green-500 ml-auto" size={20} />
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Address Type Selection */}
                    <div className="slide-in-up">
                        <div className="flex items-center gap-2 mb-4">
                            <Home className="text-green-600" size={20} />
                            <h3 className="text-lg font-semibold text-slate-800">Address Type</h3>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {addressTypes.map((type) => {
                                const IconComponent = type.icon;
                                return (
                                    <div
                                        key={type.value}
                                        onClick={() => handleAddressTypeChange(type.value)}
                                        className={`p-3 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:scale-105 ${
                                            address.addressType === type.value
                                                ? 'border-green-500 bg-green-50'
                                                : 'border-slate-200 hover:border-slate-300'
                                        }`}
                                    >
                                        <div className="text-center">
                                            <div className={`p-2 rounded-lg mx-auto mb-2 w-fit ${
                                                address.addressType === type.value ? 'bg-green-100' : 'bg-slate-100'
                                            }`}>
                                                <IconComponent className={`${
                                                    address.addressType === type.value ? 'text-green-600' : 'text-slate-600'
                                                }`} size={16} />
                                            </div>
                                            <p className={`text-xs font-medium ${
                                                address.addressType === type.value ? 'text-green-800' : 'text-slate-700'
                                            }`}>
                                                {type.label}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    {/* Contact Information */}
                    <div className="slide-in-up">
                        <div className="flex items-center gap-2 mb-4">
                            <User className="text-green-600" size={20} />
                            <h3 className="text-lg font-semibold text-slate-800">Contact Information</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
                <input 
                    name="name" 
                    onChange={handleAddressChange} 
                    value={address.name} 
                                        className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all duration-300" 
                    type="text" 
                    placeholder="Enter your name" 
                    required 
                    disabled={isSubmitting}
                />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
                <input 
                    name="email" 
                    onChange={handleAddressChange} 
                    value={address.email} 
                                        className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all duration-300" 
                    type="email" 
                    placeholder="Email address" 
                    required 
                    disabled={isSubmitting}
                />
                                </div>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Phone Number</label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
                                <input 
                                    name="phone" 
                                    onChange={handleAddressChange} 
                                    value={address.phone} 
                                    className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all duration-300" 
                                    type="tel" 
                                    placeholder="Phone Number" 
                                    required 
                                    disabled={isSubmitting}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Address Information */}
                    <div className="slide-in-up">
                        <div className="flex items-center gap-2 mb-4">
                            <MapPin className="text-green-600" size={20} />
                            <h3 className="text-lg font-semibold text-slate-800">Address Information</h3>
                        </div>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700">Street Address</label>
                <input 
                    name="street" 
                    onChange={handleAddressChange} 
                    value={address.street} 
                                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all duration-300" 
                    type="text" 
                    placeholder="Street Address" 
                    required 
                    disabled={isSubmitting}
                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700">City</label>
                    <input 
                        name="city" 
                        onChange={handleAddressChange} 
                        value={address.city} 
                                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all duration-300" 
                        type="text" 
                        placeholder="City" 
                        required 
                        disabled={isSubmitting}
                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700">State</label>
                    <input 
                        name="state" 
                        onChange={handleAddressChange} 
                        value={address.state} 
                                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all duration-300" 
                        type="text" 
                        placeholder="State" 
                        required 
                        disabled={isSubmitting}
                    />
                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700">Zip Code</label>
                    <input 
                        name="zip" 
                        onChange={handleAddressChange} 
                        value={address.zip} 
                                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all duration-300" 
                        type="text" 
                        placeholder="Zip code" 
                        required 
                        disabled={isSubmitting}
                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700">Country</label>
                    <input 
                        name="country" 
                        onChange={handleAddressChange} 
                        value={address.country} 
                                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all duration-300" 
                        type="text" 
                        placeholder="Country" 
                        required 
                        disabled={isSubmitting}
                    />
                </div>
                            </div>
                        </div>
                    </div>

                    {/* Additional Notes */}
                    <div className="slide-in-up">
                        <div className="flex items-center gap-2 mb-4">
                            <Sparkles className="text-green-600" size={20} />
                            <h3 className="text-lg font-semibold text-slate-800">Additional Notes</h3>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Special Instructions (Optional)</label>
                            <textarea 
                                name="notes" 
                    onChange={handleAddressChange} 
                                value={address.notes} 
                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all duration-300 resize-none" 
                                rows="3"
                                placeholder="Any special delivery instructions or notes..."
                    disabled={isSubmitting}
                />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="slide-in-up">
                <button 
                    type="submit"
                    disabled={isSubmitting}
                            className={`w-full py-4 rounded-2xl font-bold text-lg transition-all duration-300 ${
                        isSubmitting 
                                    ? 'bg-slate-300 text-slate-500 cursor-not-allowed' 
                                    : 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 active:scale-95 shadow-lg hover:shadow-xl'
                            }`}
                        >
                            {isSubmitting ? (
                                <div className="flex items-center justify-center gap-2">
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                    Saving Address...
                                </div>
                            ) : (
                                <div className="flex items-center justify-center gap-2">
                                    <Zap className="text-white" size={20} />
                                    Save Address
                                </div>
                            )}
                </button>
            </div>
                </div>
        </form>
        </div>
    )
}

export default AddressModal