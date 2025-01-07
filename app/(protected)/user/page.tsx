import { APP_ROUTES_USER } from "@/constants/routes";
import { redirect } from "next/navigation";

const UserPage = async () => {
  return redirect(APP_ROUTES_USER.ACCOUNT);
}

export default UserPage;