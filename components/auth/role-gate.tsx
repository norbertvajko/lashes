"use client";

import { useCurentUserRole } from "@/hooks/use-current-user-role";
import { UserRole } from "@prisma/client";
import { FormError } from "@/components/auth/form-error";

interface RoleGateProps {
    children: React.ReactNode;
    allowedRole: UserRole;
}

export const RoleGate = (props: RoleGateProps) => {
    const { children, allowedRole } = props;

    const role = useCurentUserRole();

    if (role !== allowedRole) {
        return (
            <FormError message="Nu ai permisiunea de a vizualiza acest comntinut!" />
        )
    }

    return (
        <>
            {children}
        </>
    )
}