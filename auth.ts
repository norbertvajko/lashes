import NextAuth, { Session } from "next-auth"
import authConfig from "@/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { UserRole } from "@prisma/client";
import { db } from "@/lib/db";
import { JWT } from "next-auth/jwt";
import { getUserById } from "@/data/user";
import { APP_ROUTES_AUTH } from "./constants/routes";
import { getTwoFactorConfirmationByUserId } from "./data/two-factor-confirmation";
import { getAccountByUserId } from "./data/account";

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    pages: {
        signIn: APP_ROUTES_AUTH.LOGIN,
        error: APP_ROUTES_AUTH.ERROR,
    },
    events: {
        async linkAccount({ user }) {
            await db.user.update({
                where: { id: user.id },
                data: { emailVerified: new Date() },
            })
        }
    },
    callbacks: {
        async signIn({ user, account }) {
            // Allow OAuth without email verification
            if (account?.provider !== "credentials") return true;

            const existingUser = await getUserById(user.id as string);

            //Prevent Sign in without email verification
            if (!existingUser?.emailVerified) return false;

            if (existingUser.isTwoFactorEnabled) {
               const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);

               if (!twoFactorConfirmation) return false;

               //Delete two factor confirmation for next sign in
               await db.twoFactorConfirmation.delete({
                where: { id: twoFactorConfirmation.id }
               })
            }

            return true;
        },
        async session({ token, session }: { token?: JWT, session: Session }) {
            if (token?.sub && session.user) {
                session.user.id = token.sub;
            }

            if (token?.role && session.user) {
                session.user.role = token.role as UserRole;
            }

            if (session.user && token) {
                session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
            }

            if (session.user) {
                session.user.name = token?.name;
                session.user.email = token?.email;
                session.user.image = token?.image as string;
                session.user.isOAuth = token?.isOauth as boolean;
            }

            return session;
        },
        async jwt({ token }) {

            if (!token.sub) return token; // if it doesnt exist it means user is logged out

            const existingUser = await getUserById(token.sub);

            if (!existingUser) {
                return token;
            };

            const existingAccount = await getAccountByUserId(existingUser.id);

            token.name = existingUser.name;
            token.email = existingUser.email;
            token.role = existingUser.role;
            token.image = existingUser.image;
            token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;
            token.isOauth = !!existingAccount;
            
            return token;
        }
    },
    trustHost: true,
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    ...authConfig,

})