"use client";

import * as z from "zod";

import { RegisterSchema } from "@/schemas";
import { register } from "@/actions/register";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

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
import useWindowWidth from "@/hooks/use-window-width";

export const RegisterForm = () => {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();
    const { isMobile } = useWindowWidth();
    const router = useRouter();


    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            email: "",
            password: "",
            name: ""
        },
    })

    const { email, password, name } = form.getValues();
    const hasRegisterValues = () => {
        return email.trim() !== "" && password.trim() !== "" && name.trim() !== "";
    };

    const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
        setError("");
        setSuccess("");

        startTransition(() => {
            register(values)
                .then((data) => {
                    setError(data.error);
                    setSuccess(data.success);

                    if (data.success) {
                        // Redirect to /login after successful registration with a delay of 2sec
                        setTimeout(() => {
                            router.push(APP_ROUTES_AUTH.LOGIN);
                        }, 2000)
                    }
                })
                .catch((error) => {
                    // Handle any errors during registration
                    console.error('Error during registration:', error);
                    setError('An error occurred during registration.');
                });
        });
    };

    return (
        <CardWrapper
            headerTitle="Inregistrare"
            headerLabel="Creaza un cont nou!"
            backButtonLabel="Deja inregistrat?"
            backButtonHref={APP_ROUTES_AUTH.LOGIN}
            showSocial
            className={isMobile ? "h-[100vh] w-[100vw]" : ""}
        >
            <Form {...form}>
                <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }: any) => (
                                <FormItem>
                                    <FormLabel>Nume</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="text"
                                            disabled={isPending}
                                            placeholder={`eg: "John Doe"`}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
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
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Parola</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="password"
                                            disabled={isPending}
                                            placeholder={`******`}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormError message={error} />
                    <FormSuccess message={success} />
                    <p className="text-gray-500 text-[11px] leading-4">
                        Creând un cont, ești de acord cu <b className="underline cursor-pointer">Termenii de utilizare</b> și cu <b className="underline cursor-pointer">Politica noastră de confidențialitate</b>. Ocazional, îți vom trimite e-mailuri despre știri, produse și servicii; poți renunța oricând.
                    </p>
                    <Button disabled={isPending || !hasRegisterValues()} type="submit" className="w-full">
                        Register
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}