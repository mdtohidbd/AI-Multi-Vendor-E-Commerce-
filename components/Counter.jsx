'use client'
import { addToCart, removeFromCart } from "@/lib/features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";

const Counter = ({ productId }) => {

    const { cartItems } = useSelector(state => state.cart);

    const dispatch = useDispatch();

    const addToCartHandler = () => {
        dispatch(addToCart({ productId }))
    }

    const removeFromCartHandler = () => {
        dispatch(removeFromCart({ productId }))
    }

    return (
        <div className="inline-flex items-center gap-1 sm:gap-3 px-3 py-1 rounded border border-slate-200 max-sm:text-sm text-slate-600">
            <button 
                onClick={removeFromCartHandler} 
                className="p-1 select-none hover:bg-red-50 hover:text-red-600 rounded transition-colors duration-200"
                disabled={!cartItems[productId] || cartItems[productId] <= 0}
            >
                -
            </button>
            <p className="p-1 min-w-[20px] text-center font-medium">{cartItems[productId] || 0}</p>
            <button 
                onClick={addToCartHandler} 
                className="p-1 select-none hover:bg-green-50 hover:text-green-600 rounded transition-colors duration-200"
            >
                +
            </button>
        </div>
    )
}

export default Counter