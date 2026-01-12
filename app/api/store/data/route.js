import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Get store info & store products
export async function GET(request){
    try {
        // Get store username from query params
        const { searchParams } = new URL(request.url)
        const username = searchParams.get('username')?.toLowerCase();

        if(!username) {
            return NextResponse.json({error: "missing username"}, { status: 400 })
        }

        // Find store by username
        const storeInfo = await prisma.store.findUnique({
            where: { 
                username: username 
            },
            include: {
                Product: {
                    where: {
                        inStock: true
                    },
                    orderBy: {
                        createdAt: 'desc'
                    }
                }
            }
        })

        if(!storeInfo){
            return NextResponse.json({ error: "Store not found" }, { status: 404 })
        }

        // Check if store is approved and active
        if(storeInfo.status !== 'approved' || !storeInfo.isActive){
            return NextResponse.json({ error: "Store is not available" }, { status: 403 })
        }

        return NextResponse.json({ 
            storeInfo: {
                id: storeInfo.id,
                name: storeInfo.name,
                username: storeInfo.username,
                description: storeInfo.description,
                logo: storeInfo.logo,
                email: storeInfo.email,
                contact: storeInfo.contact,
                address: storeInfo.address,
                createdAt: storeInfo.createdAt
            },
            products: storeInfo.Product
        }, { status: 200 })

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error.code || error.message }, { status: 400 })
    }
}
