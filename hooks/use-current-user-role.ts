import { useUser } from "@/context/user-context";

export const useCurentUserRole = () => {
    const { user } = useUser();

    return user?.role;
}