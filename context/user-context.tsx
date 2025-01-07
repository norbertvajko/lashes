"use client";

import { ExtendedUser } from '@/next-auth';
import { useSession } from 'next-auth/react';
import React, { createContext, useContext, useEffect } from 'react';


interface UserContextType {
    user: ExtendedUser | null;
    setUser: (user: ExtendedUser | null) => void;
}

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = React.useState<ExtendedUser | null>(null);
    const session = useSession();

    useEffect(() => {
        const userData = session?.data?.user as ExtendedUser; 
        setUser(userData);
    }, [session]);

    const value: UserContextType = { user, setUser };

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
