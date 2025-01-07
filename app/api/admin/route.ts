import { currentUserRole } from "@/lib/auth";
import { UserRole } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
    const role = await currentUserRole();

    if (role === UserRole.USER) {
        return new NextResponse(null, { status: 403 });
    }
    
    return new NextResponse(null, { status: 200 });
}