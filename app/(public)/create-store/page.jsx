'use client'
import { assets } from "@/assets/assets"
import { useEffect, useState } from "react"
import Image from "next/image"
import toast from "react-hot-toast"
import Loading from "@/components/Loading"
import { useAuth, useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import axios from "axios"
import { Store, Upload, User, Mail, Phone, MapPin, FileText, CheckCircle2, Sparkles } from "lucide-react"


export default function CreateStore() {

    const {user } = useUser()
    const router = useRouter()
    const {getToken} = useAuth()

    const [alreadySubmitted, setAlreadySubmitted] = useState(false)
    const [status, setStatus] = useState("")
    const [loading, setLoading] = useState(true)
    const [message, setMessage] = useState("")

    const [storeInfo, setStoreInfo] = useState({
        name: "",
        username: "",
        description: "",
        email: "",
        contact: "",
        address: "",
        image: ""
    })

    const onChangeHandler = (e) => {
        setStoreInfo({ ...storeInfo, [e.target.name]: e.target.value })
    }

    const fetchSellerStatus = async () => {
        const token = await getToken()
        
        try {
            const { data } = await axios.get('/api/store/create', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if(['approved', 'rejected', 'pending'].includes(data.status)) {
                setStatus(data.status)
                setAlreadySubmitted(true)
                
                switch(data.status) {
                    case "approved":
                        setMessage("Your store has been approved, you can now add products to your store from dashboard")
                        setTimeout(() => {
                            router.push("/store")
                        }, 5000)
                        break
                    case "rejected":
                        setMessage("Your store request has been rejected, contact the admin for more details")
                        setTimeout(() => {
                            router.push("/store")
                        }, 5000)
                        break
                    case "pending":
                        setMessage("Your store request is pending, please wait for admin to approve your store")
                        break
                    default:
                        break
                }
            } else {
                setAlreadySubmitted(false)
            }
        } catch (error) {
            toast.error(error?.response?.data?.error || error.message)
        }

        setLoading(false)
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault()

        try {
            const token = await getToken()
            const formData = new FormData()
            formData.append("name", storeInfo.name)
            formData.append("description", storeInfo.description)
            formData.append("username", storeInfo.username)
            formData.append("email", storeInfo.email)
            formData.append("contact", storeInfo.contact)
            formData.append("address", storeInfo.address)
            formData.append("image", storeInfo.image)

            const { data } = await axios.post('/api/store/create', formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            toast.success(data.message)

            if(data.status){
                setStatus(data.status)
                setAlreadySubmitted(true)
                if(data.status === 'approved'){
                    setMessage('Your store has been approved!')
                    setTimeout(() => {
                        router.push('/store')
                    }, 5000)
                } else {
                    setMessage(`Your store application is ${data.status}. Please wait for admin approval.`)
                }
            } else if(data.message){
                setStatus('pending')
                setAlreadySubmitted(true)
                setMessage('Your store application has been submitted successfully! Please wait for admin approval.')
            }

        } catch (error) {
            toast.error(error?.response?.data?.error || error.message)
        }
    }

    useEffect(() => {
        if(user) {
            fetchSellerStatus()
        }
    }, [user])

    if(!user) {
        return (
            <div className="min-h-[80vh] mx-6 flex items-center justify-center">
                <div className="text-center space-y-4">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 mb-4">
                        <Store className="w-10 h-10 text-slate-400" />
                    </div>
                    <h1 className="text-2xl sm:text-4xl font-semibold text-slate-400">
                        Please <span className="bg-gradient-to-r from-slate-600 to-slate-800 bg-clip-text text-transparent font-bold">Login</span> to continue
                    </h1>
                </div>
            </div>
        )
    }

    return !loading ? (
        <>
            {!alreadySubmitted ? (
                <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
                    <style jsx>{`
                        @keyframes fadeInUp {
                            from {
                                opacity: 0;
                                transform: translateY(20px);
                            }
                            to {
                                opacity: 1;
                                transform: translateY(0);
                            }
                        }
                        @keyframes shimmer {
                            0% {
                                background-position: -1000px 0;
                            }
                            100% {
                                background-position: 1000px 0;
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
                        .animate-fade-in {
                            animation: fadeInUp 0.6s ease-out forwards;
                        }
                        .animate-float {
                            animation: float 3s ease-in-out infinite;
                        }
                        .input-focus:focus {
                            transform: translateY(-2px);
                            box-shadow: 0 10px 25px -5px rgba(59, 130, 246, 0.2), 0 4px 6px -2px rgba(59, 130, 246, 0.1);
                        }
                        .upload-area:hover {
                            background: linear-gradient(135deg, rgba(59, 130, 246, 0.05), rgba(139, 92, 246, 0.05));
                            border-color: rgba(59, 130, 246, 0.3);
                        }
                        .submit-button {
                            background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
                            position: relative;
                            overflow: hidden;
                        }
                        .submit-button::before {
                            content: '';
                            position: absolute;
                            top: 0;
                            left: -100%;
                            width: 100%;
                            height: 100%;
                            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
                            transition: left 0.5s;
                        }
                        .submit-button:hover::before {
                            left: 100%;
                        }
                        .submit-button:hover {
                            background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
                            transform: translateY(-2px);
                            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.1);
                        }
                    `}</style>
                    
                    <div className="max-w-4xl mx-auto animate-fade-in">
                        {/* Header Section */}
                        <div className="text-center mb-12 space-y-4">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg mb-4 animate-float">
                                <Store className="w-8 h-8 text-white" />
                            </div>
                            <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800">
                                Add Your Store
                            </h1>
                            <p className="text-slate-600 text-lg max-w-2xl mx-auto leading-relaxed">
                                To become a seller on GoCart, submit your store details for review. Your store will be activated after admin verification.
                            </p>
                        </div>

                        {/* Form Card */}
                        <form 
                            onSubmit={e => toast.promise(onSubmitHandler(e), { loading: "Submitting data..." })} 
                            className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl shadow-slate-200/50 p-8 sm:p-10 lg:p-12 space-y-8 border border-slate-100"
                        >
                            {/* Store Logo Upload */}
                            <div className="space-y-4">
                                <label className="flex items-center gap-2 text-slate-700 font-semibold text-lg">
                                    <Upload className="w-5 h-5 text-blue-500" />
                                    Store Logo
                                </label>
                                <label className="upload-area block cursor-pointer group">
                                    <div className="flex flex-col items-center justify-center w-full h-48 rounded-2xl border-2 border-dashed border-slate-300 bg-gradient-to-br from-slate-50 to-blue-50/50 transition-all duration-300 group-hover:border-blue-400 group-hover:shadow-lg">
                                        {storeInfo.image ? (
                                            <div className="relative w-full h-full rounded-2xl overflow-hidden">
                                                <Image 
                                                    src={URL.createObjectURL(storeInfo.image)} 
                                                    alt="Store Logo" 
                                                    fill
                                                    className="object-contain p-4"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                            </div>
                                        ) : (
                                            <div className="text-center space-y-3">
                                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 group-hover:from-blue-200 group-hover:to-purple-200 transition-colors">
                                                    <Upload className="w-8 h-8 text-blue-500" />
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-slate-600 font-medium">Click to upload logo</p>
                                                    <p className="text-xs text-slate-400">PNG, JPG or GIF (max. 5MB)</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <input 
                                        type="file" 
                                        accept="image/*" 
                                        onChange={(e) => setStoreInfo({ ...storeInfo, image: e.target.files[0] })} 
                                        className="hidden" 
                                    />
                                </label>
                            </div>

                            {/* Form Fields Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Username */}
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-slate-700 font-medium">
                                        <User className="w-4 h-4 text-slate-400" />
                                        Username
                                    </label>
                                    <input 
                                        name="username" 
                                        onChange={onChangeHandler} 
                                        value={storeInfo.username} 
                                        type="text" 
                                        placeholder="Enter your store username" 
                                        className="input-focus w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-700 placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:bg-white transition-all duration-300" 
                                    />
                                </div>

                                {/* Store Name */}
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-slate-700 font-medium">
                                        <Store className="w-4 h-4 text-slate-400" />
                                        Store Name
                                    </label>
                                    <input 
                                        name="name" 
                                        onChange={onChangeHandler} 
                                        value={storeInfo.name} 
                                        type="text" 
                                        placeholder="Enter your store name" 
                                        className="input-focus w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-700 placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:bg-white transition-all duration-300" 
                                    />
                                </div>

                                {/* Email */}
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-slate-700 font-medium">
                                        <Mail className="w-4 h-4 text-slate-400" />
                                        Email
                                    </label>
                                    <input 
                                        name="email" 
                                        onChange={onChangeHandler} 
                                        value={storeInfo.email} 
                                        type="email" 
                                        placeholder="Enter your store email" 
                                        className="input-focus w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-700 placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:bg-white transition-all duration-300" 
                                    />
                                </div>

                                {/* Contact Number */}
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-slate-700 font-medium">
                                        <Phone className="w-4 h-4 text-slate-400" />
                                        Contact Number
                                    </label>
                                    <input 
                                        name="contact" 
                                        onChange={onChangeHandler} 
                                        value={storeInfo.contact} 
                                        type="text" 
                                        placeholder="Enter your contact number" 
                                        className="input-focus w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-700 placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:bg-white transition-all duration-300" 
                                    />
                                </div>
                            </div>

                            {/* Description */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-slate-700 font-medium">
                                    <FileText className="w-4 h-4 text-slate-400" />
                                    Description
                                </label>
                                <textarea 
                                    name="description" 
                                    onChange={onChangeHandler} 
                                    value={storeInfo.description} 
                                    rows={5} 
                                    placeholder="Describe your store, products, and what makes you unique..." 
                                    className="input-focus w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-700 placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:bg-white transition-all duration-300 resize-none" 
                                />
                            </div>

                            {/* Address */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-slate-700 font-medium">
                                    <MapPin className="w-4 h-4 text-slate-400" />
                                    Address
                                </label>
                                <textarea 
                                    name="address" 
                                    onChange={onChangeHandler} 
                                    value={storeInfo.address} 
                                    rows={4} 
                                    placeholder="Enter your store address..." 
                                    className="input-focus w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-700 placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:bg-white transition-all duration-300 resize-none" 
                                />
                            </div>

                            {/* Submit Button */}
                            <div className="pt-6 flex justify-center">
                                <button 
                                    type="submit"
                                    className="submit-button relative px-12 py-4 rounded-xl text-white font-semibold text-lg shadow-lg transition-all duration-300 flex items-center gap-2 group"
                                >
                                    <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                                    <span>Submit Application</span>
                                    <CheckCircle2 className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            ) : (
                <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex flex-col items-center justify-center px-4">
                    <style jsx>{`
                        @keyframes scaleIn {
                            from {
                                opacity: 0;
                                transform: scale(0.9);
                            }
                            to {
                                opacity: 1;
                                transform: scale(1);
                            }
                        }
                        @keyframes pulse {
                            0%, 100% {
                                opacity: 1;
                            }
                            50% {
                                opacity: 0.5;
                            }
                        }
                        .success-animate {
                            animation: scaleIn 0.5s ease-out;
                        }
                        .pulse-text {
                            animation: pulse 2s ease-in-out infinite;
                        }
                    `}</style>
                    <div className="text-center space-y-6 max-w-2xl success-animate">
                        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 shadow-xl mb-4">
                            <CheckCircle2 className="w-12 h-12 text-white" />
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-700 to-slate-900">
                            {message}
                        </h2>
                        {status === "approved" && (
                            <p className="text-slate-500 text-lg pulse-text">
                                Redirecting to dashboard in <span className="font-semibold text-slate-700">5 seconds</span>
                            </p>
                        )}
                    </div>
                </div>
            )}
        </>
    ) : (<Loading />)
}