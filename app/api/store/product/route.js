import authSeller from "@/middlewares/authSeller";
import { getAuth } from "@clerk/nextjs/server";
import { categories } from '@/assets/assets';


export async function POST(request){

    try {
        const { userId } = getAuth(request)
        const storeId = await authSeller(userId)


        if (!storeId){
            return NextResponse({error:"not authorized"}, {status: 401})
        }



        const formData = await request.formData()
        const name = formData.get("name")
        const description = formData.get("description")
        const mrp = Number(formData.get("mrp")) 
        const price = Number(formData.get("price"))    
        const categories = formData.get("categories")
        const images = formData.get("images")


        if (!name || !description || !mrp || !price || !categories || !images.length<1){
            return NextResponse.json({ error: "missing product details"}, {status: 400})
        }

        const imagesUrl = await Promise.all(images.map(async (image) => {}))


    } catch (error) {

    }
}