"use client";

import * as z from "zod";

import { NewPasswordSchema } from "@/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import {
    Form,
    FormControl,
    FormLabel,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { CardWrapper } from "@/components/auth/card-wrapper"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/auth/form-error";
import { FormSuccess } from "@/components/auth/form-success";
import { APP_ROUTES_AUTH } from "@/constants/routes";
import { newPassword } from "@/actions/new-password";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useSearchParams } from "next/navigation";
import useWindowWidth from "@/hooks/use-window-width";

export const NewPasswordForm = () => {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const { isMobile } = useWindowWidth();

    const form = useForm<z.infer<typeof NewPasswordSchema>>({
        resolver: zodResolver(NewPasswordSchema),
        defaultValues: {
            password: "",
        },
    })

    const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
        setError("");
        setSuccess("");

        startTransition(() => {
            newPassword(values, token)
                .then((data) => {
                    setError(data?.error);
                    setSuccess(data?.success);
                })
                .catch((error) => {
                    console.error("Error during new password", error);
                });
        })
    }

    return (
        <CardWrapper
            headerTitle="Reseteaza parola"
            headerLabel="Introdu noua parola"
            backButtonLabel="Inapoi la login"
            backButtonHref={APP_ROUTES_AUTH.LOGIN}
            className={isMobile ? "h-[100vh] w-[100vw]" : ""}
        >
            <Form {...form}>
                <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Parola noua</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="password"
                                            disabled={isPending}
                                            placeholder={`*******`}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormError message={error} />
                    <FormSuccess message={success} />
                    <Button
                        style={{ backgroundColor: isPending ? "#166d3b" : "" }}
                        disabled={isPending}
                        type="submit"
                        className="w-full"
                    >
                        {isPending ? <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> : "Reseteaza parola"}
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}
