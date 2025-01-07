"use client";

import * as z from "zod";

import { ResetSchema } from "@/schemas";
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
import { reset } from "@/actions/reset";
import { ReloadIcon } from "@radix-ui/react-icons";
import { breakpoints } from "@/constants/breakpoints/breakpoints";
import useWindowWidth from "@/hooks/use-window-width";

export const ResetForm = () => {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const { isMobile } = useWindowWidth();

    const form = useForm<z.infer<typeof ResetSchema>>({
        resolver: zodResolver(ResetSchema),
        defaultValues: {
            email: "",
        },
    })

    const { email } = form.getValues();

    const hasResetPassEmailValue = () => {
        return email.trim() !== "";
    };

    const onSubmit = (values: z.infer<typeof ResetSchema>) => {
        setError("");
        setSuccess("");

        startTransition(() => {
            reset(values)
                .then((data) => {
                    setError(data.error);
                    setSuccess(data.success);
                })
                .catch((error) => {
                    console.error("Error during resetting password", error);
                });
        })
    }

    return (
        <CardWrapper
            headerTitle="Reseteaza parola"
            headerLabel="Introdu adresa de email si vom trimite un mail pentru resetarea parolei."
            backButtonLabel="Inapoi la login"
            backButtonHref={APP_ROUTES_AUTH.LOGIN}
            className={isMobile ? "h-[100vh] w-[100vw]" : ""}
        >
            <Form {...form}>
                <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="text"
                                            disabled={isPending}
                                            placeholder={`eg: "johndoe@gmail.com"`}
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
                        disabled={isPending || !hasResetPassEmailValue()}
                        type="submit"
                        className="w-full"
                    >
                        {isPending ? <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> : `Trimite email`}
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}
