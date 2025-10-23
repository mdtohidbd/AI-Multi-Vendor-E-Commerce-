const ProductCardSkeleton = () => {
    return (
        <div className='max-xl:mx-auto animate-pulse'>
            <div className='relative bg-gradient-to-br from-gray-100 to-gray-200 h-40 sm:w-60 sm:h-68 rounded-2xl flex items-center justify-center overflow-hidden'>
                <div className='w-20 h-20 bg-gray-300 rounded-lg'></div>
            </div>
            
            <div className='flex justify-between gap-3 text-sm pt-4 max-w-60'>
                <div className='flex-1 space-y-2'>
                    <div className='h-4 bg-gray-300 rounded w-3/4'></div>
                    <div className='h-3 bg-gray-200 rounded w-1/2'></div>
                    <div className='flex gap-1'>
                        {Array(5).fill('').map((_, i) => (
                            <div key={i} className='w-3 h-3 bg-gray-300 rounded-full'></div>
                        ))}
                    </div>
                </div>
                <div className='text-right space-y-2'>
                    <div className='h-5 bg-gray-300 rounded w-16'></div>
                    <div className='h-3 bg-gray-200 rounded w-12'></div>
                </div>
            </div>
        </div>
    );
};

export default ProductCardSkeleton;
