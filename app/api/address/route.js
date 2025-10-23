import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';

// POST /api/address - Create a new address
export async function POST(req) {
    try {
        const { userId } = await auth();
        
        if (!userId) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const body = await req.json();
        const { 
            name, 
            email, 
            street, 
            city, 
            state, 
            zip, 
            country, 
            phone, 
            clientType = 'individual', 
            addressType = 'home', 
            notes = '' 
        } = body;

        // Validate required fields
        if (!name || !email || !street || !city || !state || !zip || !country || !phone) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Create new address
        const address = await prisma.address.create({
            data: {
                userId,
                name,
                email,
                street,
                city,
                state,
                zip,
                country,
                phone,
                clientType,
                addressType,
                notes
            }
        });

        return NextResponse.json({
            message: 'Address saved successfully',
            address
        }, { status: 201 });

    } catch (error) {
        console.error('Error creating address:', error);
        return NextResponse.json(
            { 
                error: 'Failed to save address',
                details: process.env.NODE_ENV === 'development' ? error.message : undefined
            },
            { status: 500 }
        );
    }
}

// GET /api/address - Get all addresses for logged in user
export async function GET(req) {
    try {
        const { userId } = await auth();
        
        if (!userId) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const addresses = await prisma.address.findMany({
            where: {
                userId
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        return NextResponse.json({
            addresses
        });

    } catch (error) {
        console.error('Error fetching addresses:', error);
        return NextResponse.json(
            { 
                error: 'Failed to fetch addresses',
                details: process.env.NODE_ENV === 'development' ? error.message : undefined
            },
            { status: 500 }
        );
    }
}

// DELETE /api/address - Delete an address
export async function DELETE(req) {
    try {
        const { userId } = await auth();
        
        if (!userId) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const { searchParams } = new URL(req.url);
        const addressId = searchParams.get('id');

        if (!addressId) {
            return NextResponse.json(
                { error: 'Address ID is required' },
                { status: 400 }
            );
        }

        // Check if address belongs to user
        const address = await prisma.address.findFirst({
            where: {
                id: addressId,
                userId
            }
        });

        if (!address) {
            return NextResponse.json(
                { error: 'Address not found or unauthorized' },
                { status: 404 }
            );
        }

        // Delete address
        await prisma.address.delete({
            where: {
                id: addressId
            }
        });

        return NextResponse.json({
            message: 'Address deleted successfully'
        });

    } catch (error) {
        console.error('Error deleting address:', error);
        return NextResponse.json(
            { 
                error: 'Failed to delete address',
                details: process.env.NODE_ENV === 'development' ? error.message : undefined
            },
            { status: 500 }
        );
    }
}
