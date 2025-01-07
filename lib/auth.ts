import { auth } from "@/auth";

let user: any = null;

export const currentUser = async () => {
    if (user === null) {
        const session = await auth();
        user = session?.user || null;
    }
    return user;
}

export const currentUserRole = async () => {
    // Ensure that the user state is populated before accessing the role
    if (user === null) {
        await currentUser();
    }
    return user?.role;
}

// Function to set the current user
export const setCurrentUser = async (newUser: any | null) => {
    user = newUser;
}