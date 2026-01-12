import authSeller from "@/middlewares/authSeller";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import ImageKit from "imagekit";
import prisma from "@/lib/prisma";

export async function POST(request){

    try {
        const { userId } = getAuth(request)
        const storeId = await authSeller(userId)


        if (!storeId){
            return NextResponse.json({error:"not authorized"}, {status: 401})
        }

        const imagekit = new ImageKit({
            publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
            privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
            urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
        });

        const formData = await request.formData()
        const name = formData.get("name")
        const description = formData.get("description")
        const mrp = Number(formData.get("mrp")) 
        const price = Number(formData.get("price"))    
        const category = formData.get("categories")
        const images = formData.getAll("images")


        if (!name || !description || !mrp || !price || !category || images.length < 1){
            return NextResponse.json({ error: "missing product details"}, {status: 400})
        }

        // Uploading Images to ImageKit
        const imagesUrl = await Promise.all(images.map(async (image) => {
            const buffer = Buffer.from(await image.arrayBuffer());
            const response = await imagekit.upload({
                file: buffer,
                fileName: image.name,
                folder: "products"
            });
            const url = imagekit.url({
                path: response.filePath,
                transformation: [
                { quality : "auto" },
                { format : "webp" },
                {width :'1024'}
                           ]
            });
            return url;
        }))

        // Create product in database
        const product = await prisma.product.create({
            data: {
                name,
                description,
                mrp,
                price,
                category,
                images: imagesUrl,
                storeId
            }
        })

        return NextResponse.json({ message: "Product created successfully", product }, { status: 201 })

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 })
    }
}

// Get all products for a seller
export async function GET(request){
    try {
        const { userId } = getAuth(request)
        const storeId = await authSeller(userId)

        if(!storeId){
            return NextResponse.json({error: 'not authorized'}, { status: 401 })
        }

        const products = await prisma.product.findMany({
            where: {
                storeId: storeId
            },
            orderBy: {
                createdAt: 'desc'
            }
        })

        return NextResponse.json({ products }, { status: 200 })

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error.code || error.message }, { status: 400 })
    }
}