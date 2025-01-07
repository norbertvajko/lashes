"use client";

import { settings } from "@/actions/settings";
import { Button } from "@/components/ui/button";
import { useTransition, useState, useEffect } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SettingsSchema } from "@/schemas";
import {
    Form,
    FormField,
    FormItem,
    FormControl,
    FormDescription,
    FormMessage,
    FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormSuccess } from "@/components/auth/form-success";
import { FormError } from "@/components/auth/form-error";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { UserRole } from "@prisma/client";
import { Switch } from "@/components/ui/switch";
import { useCurentUserRole } from "@/hooks/use-current-user-role";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaExpandAlt, FaTimes, FaUser } from "react-icons/fa";
import { UploadButton } from "@/utils/uploadthings";
import { ScaleLoader } from "react-spinners";
import { useCurrentUser } from "@/hooks/use-current-user";
import { convertToTitleCase } from "@/utils/str-utils";
import { useSession } from "next-auth/react";
import { Navbar } from "@/components/general/navbar";

const ManageAccountPage = () => {
    const { user } = useCurrentUser();
    const userRole = useCurentUserRole();

    const { update } = useSession();

    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();

    const [avatar, setAvatar] = useState<string | undefined>("");
    const [avatarLoading, setAvatarLoading] = useState<boolean>(false);
    const [showAvatarPopup, setShowAvatarPopup] = useState(false);
    const [avatarHovered, setAvatarHovered] = useState(false);
    const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState(false);

    const avatarSrc = avatar ? avatar : user?.image ?? undefined;

    const [isPending, startTransition] = useTransition();

    const onSubmit = (values: z.infer<typeof SettingsSchema>) => {
        startTransition(() => {
            settings(values)
                .then((data) => {
                    if (data.error) {
                        setError(data.error);
                    };

                    if (data.success) {
                        setSuccess(data.success);
                        update();
                    }
                })
                .catch(() => {
                    setError("Something went wrong!");
                });
        })
    };

    const form = useForm<z.infer<typeof SettingsSchema>>({
        resolver: zodResolver(SettingsSchema),
    });

    useEffect(() => {
        if (form.formState.isDirty) {
            form.formState.isDirty && form.clearErrors();
        }

    }, [form.formState.isDirty, form.clearErrors]);

    useEffect(() => {
        setTimeout(() => {
            if (error || success) {
                setError(undefined);
                setSuccess(undefined);
                setIsSubmitButtonDisabled(true);
            }
        }, 3000);
    }, [error, success])


    useEffect(() => {
        if (user) {
            form.reset({
                name: user.name || "",
                email: user.email || "",
                role: user.role as UserRole || "",
                isTwoFactorEnabled: user.isTwoFactorEnabled || false,
                image: user.image || "",
            });
        }
    }, [user, form]);

    return (
        <>
            <Form {...form}>
                <form onChange={() => setIsSubmitButtonDisabled(false)} className="space-y-6 pt-32 sm:pt-6" onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="image"
                            render={({ field }) => (
                                <FormItem className={"relative"}>
                                    <FormControl>
                                        <>
                                            <div className="flex flex-row p-3 border dark:border-[#1E293B] rounded-md">
                                                <div
                                                    className={"relative group"}
                                                    onMouseEnter={() => setAvatarHovered(true)}
                                                    onMouseLeave={() => setAvatarHovered(false)}
                                                >
                                                    <Avatar className={"w-[92px] h-[92px]"}>
                                                        <AvatarImage className="object-cover" src={avatarSrc} />
                                                        <AvatarFallback className="bg-gray-500">
                                                            <FaUser className={"w-[30px] h-[30px] text-white"} />
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    {avatarHovered && (
                                                        <div
                                                            className="absolute inset-0 flex justify-center items-center cursor-pointer dark:bg-black dark:bg-opacity-50"
                                                            onClick={() => setShowAvatarPopup(true)}
                                                        >
                                                            <FaExpandAlt className="text-white text-4xl" />
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="flex flex-col items-start px-3 relative">
                                                    <UploadButton
                                                        content={{"allowedContent": " ", button: avatar || user?.image ? 'Editeaza poza de profil' : "Selecteaza o noua poza de profil" }}
                                                        className="absolute w-[200px] p-3 opacity-0 left-0 top-5 z-10"
                                                        endpoint="imageUploader"
                                                        onClientUploadComplete={(res) => {
                                                            const img = res[0].url;
                                                            setAvatar(img);

                                                            field.onChange(img);
                                                            setAvatarLoading(false);
                                                        }}
                                                        onUploadError={(error: Error) => {
                                                            setError(error.message);
                                                        }}
                                                        onUploadProgress={() => setAvatarLoading(true)}
                                                    />

                                                    <p className="font-semibold">{user?.name}</p>

                                                    {!avatarLoading ? (
                                                        <Button
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                return;
                                                            }}
                                                            className="px-0 relative underline"
                                                            variant={"link"}
                                                        >
                                                            {avatar || user?.image ? 'Editeaza poza de profil' : "Selecteaza o noua poza de profil"}
                                                        </Button>
                                                    ) : (
                                                        <ScaleLoader color="#36d7b7" className="my-3" />
                                                    )}
                                                </div>
                                            </div>
                                        </>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder={`eg: "John Doe"`}
                                            disabled={isPending}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {!user?.isOAuth && (
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
                                                    placeholder={`johndoe@mail.com`}
                                                    disabled={isPending}
                                                    type="email"
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
                                            <FormLabel>Parola curenta</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder={`******`}
                                                    disabled={isPending}
                                                    type="password"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="newPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Parola noua</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder={`******`}
                                                    disabled={isPending}
                                                    type="password"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </>
                        )}

                        <FormField
                            control={form.control}
                            name="role"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Role</FormLabel>
                                    <Select
                                        disabled={isPending || userRole === UserRole.USER}
                                        onValueChange={field.onChange}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder={!user ? "Select a role" : convertToTitleCase(user?.role)} />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value={UserRole.ADMIN}>
                                                Admin
                                            </SelectItem>
                                            <SelectItem value={UserRole.USER}>
                                                User
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {!user?.isOAuth && (
                            <FormField
                                control={form.control}
                                name="isTwoFactorEnabled"
                                render={({ field }) => (
                                    <FormItem
                                        className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                        <div className="space-y-0.5">
                                            <FormLabel>Two Factor Authentication</FormLabel>
                                            <FormDescription>
                                                Enable two factor authentication for your account.
                                            </FormDescription>
                                        </div>
                                        <FormControl>
                                            <Switch
                                                disabled={isPending}
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        )}
                        <FormError message={error} />
                        <FormSuccess message={success} />
                        <div className={"pt-3.5 sm:pb-0 pb-4"}>
                            <Button size={"lg"} disabled={isSubmitButtonDisabled || !form.formState.isDirty || isPending} type="submit">
                                Save
                            </Button>
                        </div>
                    </div>
                </form>
                {showAvatarPopup && (
                    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
                        <div className="w-700 h-600 relative bg-white rounded-lg flex justify-center items-center">
                            <Avatar className={"w-[350px] h-[350px] md:w-[700px] md:h-[600px] rounded-lg"}>
                                <AvatarImage src={avatarSrc} className="object-cover " />
                                <AvatarFallback className="bg-gray-500">
                                    <FaUser className={"w-[100px] h-[100px] text-white"} />
                                </AvatarFallback>
                            </Avatar>
                            <div
                                className="absolute top-3 right-3 cursor-pointer text-white text-xl"
                                onClick={() => setShowAvatarPopup(false)}
                            >
                                <FaTimes />
                            </div>
                        </div>

                    </div>
                )}
            </Form>
        </>
    )
}

export default ManageAccountPage;