import { UserInfo } from "@/components/user-info"
import { currentUser } from "@/lib/auth";

const SettingsProfilePage = async () => {
    const user = await currentUser();

    return (
        <UserInfo
            user={user}
        />
    )
}

export default SettingsProfilePage;