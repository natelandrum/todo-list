import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "./auth.config";
import { prisma } from "./prisma";


export const { auth, handlers: { GET, POST }, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
  callbacks: {
    async jwt({ token }) {
        return token;
    },
    async session({ session, token }) {
        if (!token.sub) return session;

        session.user = {
            ...session.user, 
            id: token.sub,
        }

        return session;
    },
},
});
