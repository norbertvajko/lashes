"use server";

import { currentUserRole } from "@/lib/auth";
import { UserRole } from "@prisma/client";

export const admin = async () => {
    const role = await currentUserRole();

    if (role === UserRole.USER) {
        return { error: "Forbidden" };
    }

    return { success: "Allowed" };
}