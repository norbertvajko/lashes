import { CardWrapper } from "@/components/auth/card-wrapper";
import { APP_ROUTES_AUTH } from "@/constants/routes";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

export const ErrorCard = () => {
    return (
        <CardWrapper
            headerTitle="Error"
            headerLabel="Ooops! Something went wrong!"
            backButtonHref={APP_ROUTES_AUTH.LOGIN}
            backButtonLabel="Inapoi la login"
        >
            <div className="w-full flex justify-center items-center">
                <ExclamationTriangleIcon className="text-destructive" />

            </div>
        </CardWrapper>
    )
}