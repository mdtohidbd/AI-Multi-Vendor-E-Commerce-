'use client'
import dynamic from "next/dynamic"
import { useAuth } from "@clerk/nextjs"
import axios from "axios"
import { CircleDollarSignIcon, ShoppingBasketIcon, StoreIcon, TagsIcon } from "lucide-react"
import toast from "react-hot-toast"
import { useEffect, useState } from "react"

// Dynamically load heavy chart library to keep admin dashboard fast
const OrdersAreaChart = dynamic(() => import("@/components/OrdersAreaChart"), {
    ssr: false,
    loading: () => (
        <div className="w-full max-w-4xl h-[300px] text-xs flex items-center justify-center border border-dashed border-slate-200 rounded-lg mt-4 animate-pulse">
            <span className="text-slate-400 text-sm">Loading chart...</span>
        </div>
    ),
})

export default function AdminDashboard() {

    const { getToken } = useAuth()

    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$'

    const [loading, setLoading] = useState(true)
    const [dashboardData, setDashboardData] = useState({
        products: 0,
        revenue: 0,
        orders: 0,
        stores: 0,
        allOrders: [],
    })

    const dashboardCardsData = [
        { title: 'Total Products', value: dashboardData.products, icon: ShoppingBasketIcon },
        { title: 'Total Revenue', value: currency + dashboardData.revenue, icon: CircleDollarSignIcon },
        { title: 'Total Orders', value: dashboardData.orders, icon: TagsIcon },
        { title: 'Total Stores', value: dashboardData.stores, icon: StoreIcon },
    ]

    const fetchDashboardData = async () => {
        try {
            const token = await getToken()

            const { data } = await axios.get('/api/admin/dashboard', {
                headers: { Authorization: `Bearer ${token}` }
            })

            setDashboardData(data.dashboardData)
        } catch (error) {
            toast.error(error?.response?.data?.error || error.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchDashboardData()
    }, [])

    if (loading) {
        // Show skeletons inside the admin layout instead of a full-page spinner
        return (
            <div className="text-slate-500">
                <h1 className="text-2xl">Admin <span className="text-slate-800 font-medium">Dashboard</span></h1>

                <div className="flex flex-wrap gap-5 my-10 mt-4">
                    {[1, 2, 3, 4].map((index) => (
                        <div
                            key={index}
                            className="flex items-center gap-10 border border-slate-200 p-3 px-6 rounded-lg animate-pulse"
                        >
                            <div className="flex flex-col gap-3 text-xs">
                                <div className="h-3 w-24 bg-slate-200 rounded" />
                                <div className="h-6 w-16 bg-slate-200 rounded" />
                            </div>
                            <div className="w-11 h-11 rounded-full bg-slate-100" />
                        </div>
                    ))}
                </div>

                <div className="w-full max-w-4xl h-[300px] border border-dashed border-slate-200 rounded-lg animate-pulse" />
            </div>
        )
    }

    return (
        <div className="text-slate-500">
            <h1 className="text-2xl">Admin <span className="text-slate-800 font-medium">Dashboard</span></h1>

            {/* Cards */}
            <div className="flex flex-wrap gap-5 my-10 mt-4">
                {
                    dashboardCardsData.map((card, index) => (
                        <div key={index} className="flex items-center gap-10 border border-slate-200 p-3 px-6 rounded-lg">
                            <div className="flex flex-col gap-3 text-xs">
                                <p>{card.title}</p>
                                <b className="text-2xl font-medium text-slate-700">{card.value}</b>
                            </div>
                            <card.icon size={50} className=" w-11 h-11 p-2.5 text-slate-400 bg-slate-100 rounded-full" />
                        </div>
                    ))
                }
            </div>

            {/* Area Chart */}
            <OrdersAreaChart allOrders={dashboardData.allOrders} />
        </div>
    )
}