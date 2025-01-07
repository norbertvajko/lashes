import {ExtendedUser} from "@/next-auth";
import {Badge} from "@/components/ui/badge";
import {Avatar, AvatarImage, AvatarFallback} from "@/components/ui/avatar";
import {FaUser} from "react-icons/fa";
import React from "react";

interface UserInfoProps {
    user?: ExtendedUser;
    label?: string;
}

const UserInfoItem = ({label, value}: { label: string; value: string | React.ReactNode }) => (
    <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
        <p className="text-sm font-medium">{label}</p>
        <p className="truncate text-xs max-w-[180px] font-mono p-1 rounded-md">{value}</p>
    </div>
);

const UserInfoBadgeItem = ({label, value}: { label: string; value: boolean }) => (
    <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
        <p className="text-sm font-medium">{label}</p>
        <Badge variant={value ? "success" : "destructive"}>{value ? "ON" : "OFF"}</Badge>
    </div>
);

export const UserInfo = (props: UserInfoProps) => {
    const {user, label} = props;

    const userInfoFields = [
        {
            label: "Avatar", key: "avatar", value: <Avatar>
                <AvatarImage className="object-cover" src={user?.image || ""}/>
                <AvatarFallback className="bg-gray-500">
                    <FaUser className="text-white"/>
                </AvatarFallback>
            </Avatar>
        },
        {label: "ID", key: "id", value: user?.id || ""},
        {label: "Name", key: "name", value: user?.name || ""},
        {label: "Email", key: "email", value: user?.email || ""},
        {label: "Role", key: "role", value: user?.role || ""}
    ];

    return (
        <>
            <p className="text-2xl font-semibold text-center pb-3">{label}</p>
            <div className="space-y-4">
                {userInfoFields.map(({label, key, value}) => (
                    <UserInfoItem label={label} key={key} value={value}/>
                ))}
                <UserInfoBadgeItem label="Two Factor Authentication" value={user?.isTwoFactorEnabled || false}/>
            </div>
        </>
    );
}
