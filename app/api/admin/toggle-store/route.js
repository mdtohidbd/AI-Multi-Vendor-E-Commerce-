import prisma from "@/lib/prisma";
import authAdmin from "@/middlewares/authAdmin";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// toggle store active status
export async function POST(request) {
    try {
        const { userId } = getAuth(request);
        const isAdmin = await authAdmin(userId);

        if (!isAdmin) {
            return NextResponse.json({ error: "not authorized" }, { status: 401 });
        }

        const body = await request.json();
        const storeId = body.storeId || body.storeid || body.storeID || body.storeld;

        if (!storeId) {
            return NextResponse.json({ error: "missing storeId" }, { status: 400 });
        }

        // Find the store
        const store = await prisma.store.findUnique({
            where: { id: storeId }
        });

        if (!store) {
            return NextResponse.json({ error: "store not found" }, { status: 400 });
        }

        // Toggle the isActive status
        const updatedStore = await prisma.store.update({
            where: { id: storeId },
            data: {
                isActive: !store.isActive
            }
        });

        return NextResponse.json({
            message: `Store ${updatedStore.isActive ? 'activated' : 'deactivated'} successfully`,
            store: updatedStore
        }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error.code || error.message }, { status: 400 });
    }
}
