import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// POST /api/orders - Create a new order
export async function POST(req) {
    try {
        const body = await req.json();
        const { 
            userId, 
            storeId, 
            addressId, 
            items, 
            total, 
            paymentMethod, 
            coupon,
            isCouponUsed = false 
        } = body;

        // Validate required fields
        if (!userId || !storeId || !addressId || !items || !total || !paymentMethod) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Validate items array
        if (!Array.isArray(items) || items.length === 0) {
            return NextResponse.json(
                { error: 'Items must be a non-empty array' },
                { status: 400 }
            );
        }

        // Create order with order items in a transaction
        const order = await prisma.$transaction(async (tx) => {
            // Create the main order
            const newOrder = await tx.order.create({
                data: {
                    userId,
                    storeId,
                    addressId,
                    total: parseFloat(total),
                    paymentMethod,
                    isCouponUsed,
                    coupon: coupon ? JSON.stringify(coupon) : '{}',
                    status: 'ORDER_PLACED'
                }
            });

            // Create order items
            const orderItems = await Promise.all(
                items.map(async (item) => {
                    return tx.orderItem.create({
                        data: {
                            orderId: newOrder.id,
                            productId: item.productId,
                            quantity: item.quantity,
                            price: parseFloat(item.price)
                        }
                    });
                })
            );

            // Return order with items
            return {
                ...newOrder,
                orderItems
            };
        });

        // Fetch the complete order with relations for response
        const completeOrder = await prisma.order.findUnique({
            where: { id: order.id },
            include: {
                orderItems: {
                    include: {
                        product: true
                    }
                },
                address: true,
                user: true,
                store: true
            }
        });

        return NextResponse.json({
            message: 'Order created successfully',
            order: completeOrder
        }, { status: 201 });

    } catch (error) {
        console.error('Error creating order:', error);
        return NextResponse.json(
            { 
                error: 'Failed to create order',
                details: process.env.NODE_ENV === 'development' ? error.message : undefined
            },
            { status: 500 }
        );
    }
}

// GET /api/orders - Get all orders (with pagination and filtering)
export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get('userId');
        const storeId = searchParams.get('storeId');
        const status = searchParams.get('status');
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '10');
        const skip = (page - 1) * limit;

        // Build where clause
        const where = {};
        if (userId) where.userId = userId;
        if (storeId) where.storeId = storeId;
        if (status) where.status = status;

        // Get orders with pagination
        const orders = await prisma.order.findMany({
            where,
            include: {
                orderItems: {
                    include: {
                        product: true
                    }
                },
                address: true,
                user: true,
                store: true
            },
            orderBy: {
                createdAt: 'desc'
            },
            skip,
            take: limit
        });

        // Get total count for pagination
        const totalCount = await prisma.order.count({ where });
        const totalPages = Math.ceil(totalCount / limit);

        return NextResponse.json({
            orders,
            pagination: {
                page,
                limit,
                totalCount,
                totalPages,
                hasMore: page < totalPages
            }
        });

    } catch (error) {
        console.error('Error fetching orders:', error);
        return NextResponse.json(
            { 
                error: 'Failed to fetch orders',
                details: process.env.NODE_ENV === 'development' ? error.message : undefined
            },
            { status: 500 }
        );
    }
}