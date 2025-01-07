"use client";

import * as z from "zod";

import { LoginSchema } from "@/schemas";
import { login } from "@/actions/login";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
import { ReloadIcon } from "@radix-ui/react-icons"
import { APP_ROUTES_AUTH } from "@/constants/routes";
import Link from "next/link";
import { InfoIcon } from "@/components/general/info-icon";
import useWindowWidth from "@/hooks/use-window-width";

export const LoginForm = () => {
    const [showTwoFactor, setShowTwoFactor] = useState(false);
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isLoading, setIsLoading] = useState(false);

    const searchParams = useSearchParams();
    const { isMobile } = useWindowWidth();

    const urlError =
        searchParams.get("error") === "OAuthAccountNotLinked"
            ? "Email already in use with different provider"
            : "";

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
            code: "",
        }
    });

    const { email, password, code } = form.getValues();
    const hasLoginValues = () => {
        return email.trim() !== "" && password.trim() !== "";
    };

    const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
        setError("");
        setSuccess("");
        setIsLoading(true);

        try {
            const data = await login(values);
            if (data?.error) {
                form.reset();
                setError(data.error);
            } else if (data?.success && typeof data.success === 'string') {
                form.reset();
                setSuccess(data.success);
            } else if (data?.twoFactor) {
                setShowTwoFactor(true);
            }
        } catch (error) {
            setError(`Something went wrong: ${error}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <CardWrapper
            headerTitle="Log in"
            headerLabel="Bine ai revenit!"
            backButtonLabel="Creeaza cont nou"
            backButtonHref={APP_ROUTES_AUTH.REGISTER}
            showSocial
            className={isMobile ? "h-[100vh] w-[100vw]" : ""}
        >
            <Form {...form}>
                <form
                    className="space-y-6"
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <div className="space-y-4">
                        {showTwoFactor && (
                            <FormField
                                control={form.control}
                                name="code"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="flex flex-row gap-1.5">
                                            Two Factor Code
                                            <InfoIcon infoText={"In order to proceed further, a two-factor code was sent via email."} />
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                disabled={isLoading}
                                                placeholder={`eg: "123456"`}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        )}
                        {!showTwoFactor && (
                            <>
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
                                                    disabled={isLoading}
                                                    placeholder={`eg: "johndoe@gmail.com"`}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    type="password"
                                                    disabled={isLoading}
                                                    placeholder={`******`}
                                                />
                                            </FormControl>
                                            <Button
                                                className="px-0 font-normal flex justify-end text-slate-500"
                                                size="sm"
                                                variant="link"
                                                asChild
                                            >
                                                <Link href={APP_ROUTES_AUTH.RESET} >
                                                    Recuperare parola
                                                </Link>
                                            </Button>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </>
                        )}
                    </div>
                    <FormError message={error || urlError} />
                    <FormSuccess message={success} />
                    <Button
                        style={{
                            backgroundColor: isLoading
                                ? "#166d3b"
                                : "",
                        }}
                        disabled={isLoading || !hasLoginValues()}
                        type="submit"
                        className="w-full"
                    >
                        {isLoading ? (
                            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                        ) : showTwoFactor ? (
                            "Confirm"
                        ) : (
                            "Login"
                        )}
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    );
};
