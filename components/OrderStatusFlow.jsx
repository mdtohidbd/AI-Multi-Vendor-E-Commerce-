'use client'
import { CheckCircleIcon, ClockIcon, PackageIcon, TruckIcon, HomeIcon, CircleIcon } from 'lucide-react';
import { useState, useEffect } from 'react';

const OrderStatusFlow = ({ currentStatus, orderId, showDetails = true }) => {
    const [animateProgress, setAnimateProgress] = useState(false);

    // Define all order stages with enhanced status
    const orderStages = [
        {
            status: 'ORDER_PLACED',
            label: 'Order Placed',
            description: 'Your order has been confirmed',
            icon: CheckCircleIcon,
            color: 'text-green-500',
            bgColor: 'bg-green-100',
            timestamp: null
        },
        {
            status: 'PROCESSING',
            label: 'Processing',
            description: 'Order is being prepared',
            icon: ClockIcon,
            color: 'text-blue-500',
            bgColor: 'bg-blue-100',
            timestamp: null
        },
        {
            status: 'PACKAGED',
            label: 'Packaged',
            description: 'Order has been packaged',
            icon: PackageIcon,
            color: 'text-purple-500',
            bgColor: 'bg-purple-100',
            timestamp: null
        },
        {
            status: 'SHIPPED',
            label: 'Shipped',
            description: 'Order is on its way',
            icon: TruckIcon,
            color: 'text-orange-500',
            bgColor: 'bg-orange-100',
            timestamp: null
        },
        {
            status: 'OUT_FOR_DELIVERY',
            label: 'Out for Delivery',
            description: 'Order is out for delivery',
            icon: TruckIcon,
            color: 'text-yellow-600',
            bgColor: 'bg-yellow-100',
            timestamp: null
        },
        {
            status: 'DELIVERED',
            label: 'Delivered',
            description: 'Order has been delivered',
            icon: HomeIcon,
            color: 'text-green-600',
            bgColor: 'bg-green-100',
            timestamp: null
        }
    ];

    // Find current stage index
    const currentStageIndex = orderStages.findIndex(stage => stage.status === currentStatus);
    const isCompleted = (index) => index <= currentStageIndex;
    const isCurrent = (index) => index === currentStageIndex;

    useEffect(() => {
        setAnimateProgress(true);
    }, []);

    return (
        <div className="w-full">
            {/* Mobile View - Vertical */}
            <div className="md:hidden">
                <div className="space-y-4">
                    {orderStages.map((stage, index) => {
                        const IconComponent = stage.icon;
                        const completed = isCompleted(index);
                        const current = isCurrent(index);
                        
                        return (
                            <div key={stage.status} className="flex items-start space-x-4">
                                <div className="flex flex-col items-center">
                                    <div
                                        className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-500 ${
                                            completed
                                                ? `${stage.bgColor} ${stage.color} border-current`
                                                : current
                                                ? `${stage.bgColor} ${stage.color} border-current animate-pulse`
                                                : 'bg-gray-100 text-gray-400 border-gray-300'
                                        }`}
                                    >
                                        <IconComponent size={20} />
                                    </div>
                                    {index < orderStages.length - 1 && (
                                        <div
                                            className={`w-0.5 h-8 mt-2 transition-colors duration-500 ${
                                                completed ? 'bg-green-500' : 'bg-gray-300'
                                            }`}
                                        />
                                    )}
                                </div>
                                <div className="flex-1 pb-8">
                                    <h3
                                        className={`font-medium text-sm transition-colors duration-300 ${
                                            completed || current ? 'text-gray-900' : 'text-gray-500'
                                        }`}
                                    >
                                        {stage.label}
                                    </h3>
                                    <p
                                        className={`text-xs mt-1 transition-colors duration-300 ${
                                            completed || current ? 'text-gray-600' : 'text-gray-400'
                                        }`}
                                    >
                                        {stage.description}
                                    </p>
                                    {current && (
                                        <div className="mt-2">
                                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                Current Status
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Desktop View - Horizontal */}
            <div className="hidden md:block">
                <div className="flex items-center justify-between">
                    {orderStages.map((stage, index) => {
                        const IconComponent = stage.icon;
                        const completed = isCompleted(index);
                        const current = isCurrent(index);
                        
                        return (
                            <div key={stage.status} className="flex flex-col items-center flex-1">
                                <div className="flex items-center w-full">
                                    {index > 0 && (
                                        <div
                                            className={`flex-1 h-1 mr-4 transition-all duration-700 ${
                                                animateProgress && completed
                                                    ? 'bg-green-500'
                                                    : 'bg-gray-300'
                                            }`}
                                            style={{
                                                transitionDelay: `${index * 200}ms`
                                            }}
                                        />
                                    )}
                                    <div
                                        className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-500 ${
                                            completed
                                                ? `${stage.bgColor} ${stage.color} border-current`
                                                : current
                                                ? `${stage.bgColor} ${stage.color} border-current animate-pulse`
                                                : 'bg-gray-100 text-gray-400 border-gray-300'
                                        }`}
                                        style={{
                                            transitionDelay: `${index * 100}ms`
                                        }}
                                    >
                                        <IconComponent size={24} />
                                    </div>
                                    {index < orderStages.length - 1 && (
                                        <div
                                            className={`flex-1 h-1 ml-4 transition-all duration-700 ${
                                                animateProgress && completed && index < currentStageIndex
                                                    ? 'bg-green-500'
                                                    : 'bg-gray-300'
                                            }`}
                                            style={{
                                                transitionDelay: `${(index + 1) * 200}ms`
                                            }}
                                        />
                                    )}
                                </div>
                                
                                {showDetails && (
                                    <div className="mt-4 text-center">
                                        <h3
                                            className={`font-medium text-sm transition-colors duration-300 ${
                                                completed || current ? 'text-gray-900' : 'text-gray-500'
                                            }`}
                                        >
                                            {stage.label}
                                        </h3>
                                        <p
                                            className={`text-xs mt-1 transition-colors duration-300 ${
                                                completed || current ? 'text-gray-600' : 'text-gray-400'
                                            }`}
                                        >
                                            {stage.description}
                                        </p>
                                        {current && (
                                            <div className="mt-2">
                                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                    Current
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Status Summary */}
            {showDetails && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <h4 className="font-medium text-gray-900">
                                {orderStages[currentStageIndex]?.label}
                            </h4>
                            <p className="text-sm text-gray-600 mt-1">
                                {orderStages[currentStageIndex]?.description}
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-gray-500">Order ID</p>
                            <p className="font-mono text-sm font-medium text-gray-900">
                                #{orderId?.slice(-8) || 'N/A'}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrderStatusFlow;