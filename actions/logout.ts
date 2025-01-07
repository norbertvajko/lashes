"use server";

import { signOut } from "@/auth";
import { APP_ROUTES } from "@/constants/routes";
import { setCurrentUser } from "@/lib/auth";

export const logout = async () => {

    await signOut({
        redirectTo: APP_ROUTES.HOME,
    });

    await setCurrentUser(null);
}