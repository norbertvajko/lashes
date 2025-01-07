"use client";

import { CardWrapper } from "@/components/auth/card-wrapper";
import { APP_ROUTES_AUTH } from "@/constants/routes";
import { PropagateLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { newVerification } from "@/actions/new-verification";
import { FormError } from "@/components/auth/form-error";
import { FormSuccess } from "@/components/auth/form-success";
import useWindowWidth from "@/hooks/use-window-width";

export const NewVerificationForm = () => {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");

    const searchParams = useSearchParams();
    const { isMobile} = useWindowWidth();

    const token = searchParams.get("token");

    const onSubmit = useCallback(() => {
        // if (!success || error) return;

        if (!token) {
            setError("Missing token!");
            return;
        }

        newVerification(token)
            .then((data) => {
                setSuccess(data.success);
                setError(data.error);
            })
            .catch(() => {
                setError("Something went wrong!");
            })
    }, [token, success, error]);

    useEffect(() => {
        onSubmit();
    }, [onSubmit])

    return (
        <CardWrapper
            headerTitle="Verificare email"
            headerLabel="Confirma verificarea"
            backButtonLabel="Inapoi la login"
            backButtonHref={APP_ROUTES_AUTH.LOGIN}
            className={isMobile ? "h-[100vh] w-[100vw]" : ""}
        >
            <div className="flex items-center w-full justify-center flex-col space-y-[36px]">
                {!success && !error && <PropagateLoader color={"#013220"} />}
                <FormSuccess message={success} />
                {!success && <FormError message={error} />}
            </div>
        </CardWrapper>
    )
}