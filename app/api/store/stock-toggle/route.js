import authSeller from "@/middlewares/authSeller";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// toggle stock of a product
export async function POST(request){
    try {
        const { userId } = getAuth(request)
        const { productId } = await request.json()

        if(!productId) {
            return NextResponse.json({ error: "missing details: productId" }, { status: 400 });
        }

        const storeId = await authSeller(userId)

        if(!storeId){
            return NextResponse.json({error: 'not authorized'}, { status: 401 })
        }

        // Find the product and verify it belongs to the store
        const product = await prisma.product.findFirst({
            where: {
                id: productId,
                storeId: storeId
            }
        })

        if(!product){
            return NextResponse.json({ error: "Product not found or not authorized" }, { status: 404 })
        }

        // Toggle the inStock status
        const updatedProduct = await prisma.product.update({
            where: {
                id: productId
            },
            data: {
                inStock: !product.inStock
            }
        })

        return NextResponse.json({ 
            message: `Stock ${updatedProduct.inStock ? 'enabled' : 'disabled'} successfully`,
            product: updatedProduct 
        }, { status: 200 })

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error.code || error.message }, { status: 400 })
    }
}
