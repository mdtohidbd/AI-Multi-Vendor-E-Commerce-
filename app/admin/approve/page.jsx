'use client'
import StoreInfo from "@/components/admin/StoreInfo"
import Loading from "@/components/Loading"
import { useAuth, useUser } from "@clerk/nextjs"
import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

export default function AdminApprove() {

    const { user } = useUser()
    const { getToken } = useAuth()

    const [stores, setStores] = useState([])
    const [loading, setLoading] = useState(true)
    const [processingStoreId, setProcessingStoreId] = useState(null)
    const [processingAction, setProcessingAction] = useState(null) // 'approved' | 'rejected'

    const fetchStores = async () => {
        try {
            const token = await getToken()

            const { data } = await axios.get('/api/admin/approve-store', {
                headers: { Authorization: `Bearer ${token}` }
            })

            setStores(data.stores || [])
        } catch (error) {
            toast.error(error?.response?.data?.error || error.message)
        } finally {
            setLoading(false)
        }
    }

    const handleApprove = async ({ storeId, status }) => {
        try {
            setProcessingStoreId(storeId)
            setProcessingAction(status)

            const token = await getToken()

            const { data } = await axios.post('/api/admin/approve-store', {
                storeId,
                status
            }, {
                headers: { Authorization: `Bearer ${token}` }
            })

            toast.success(data.message || `Store ${status} successfully`)

            // Refresh list after action
            fetchStores()
        } catch (error) {
            toast.error(error?.response?.data?.error || error.message)
        } finally {
            setProcessingStoreId(null)
            setProcessingAction(null)
        }
    }

    useEffect(() => {
       if (user)fetchStores()
    }, [user])

    if (loading) return <Loading />

    return (
        <div className="text-slate-500 mb-28">
            <h1 className="text-2xl">Approve <span className="text-slate-800 font-medium">Stores</span></h1>

            {stores.length ? (
                <div className="flex flex-col gap-4 mt-4">
                    {stores.map((store) => (
                        <div key={store.id} className="bg-white border rounded-lg shadow-sm p-6 flex max-md:flex-col gap-4 md:items-end max-w-4xl" >
                            {/* Store Info */}
                            <StoreInfo store={store} />

                            {/* Actions */}
                            <div className="flex gap-3 pt-2 flex-wrap">
                                <button
                                    onClick={() => toast.promise(
                                        handleApprove({ storeId: store.id, status: 'approved' }),
                                        { loading: "Approving store..." }
                                    )}
                                    disabled={processingStoreId === store.id}
                                    className={`px-4 py-2 rounded text-sm text-white transition ${
                                        processingStoreId === store.id && processingAction === 'approved'
                                            ? 'bg-green-400 cursor-not-allowed'
                                            : 'bg-green-600 hover:bg-green-700'
                                    }`}
                                >
                                    {processingStoreId === store.id && processingAction === 'approved'
                                        ? 'Approving...'
                                        : 'Approve'}
                                </button>
                                <button
                                    onClick={() => toast.promise(
                                        handleApprove({ storeId: store.id, status: 'rejected' }),
                                        { loading: "Rejecting store..." }
                                    )}
                                    disabled={processingStoreId === store.id}
                                    className={`px-4 py-2 rounded text-sm text-white transition ${
                                        processingStoreId === store.id && processingAction === 'rejected'
                                            ? 'bg-slate-400 cursor-not-allowed'
                                            : 'bg-slate-500 hover:bg-slate-600'
                                    }`}
                                >
                                    {processingStoreId === store.id && processingAction === 'rejected'
                                        ? 'Rejecting...'
                                        : 'Reject'}
                                </button>
                            </div>
                        </div>
                    ))}

                </div>) : (
                <div className="flex items-center justify-center h-80">
                    <h1 className="text-3xl text-slate-400 font-medium">No Application Pending</h1>
                </div>
            )}
        </div>
    )
}