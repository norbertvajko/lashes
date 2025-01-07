import { useUser } from "@/context/user-context";

export const useCurrentUser = () => {
    const user = useUser();

    return user;
}
