import NextAuth from 'next-auth'
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/prisma"
import Google from "next-auth/providers/google"

export const { auth, handlers, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [Google],
    pages:
    {
        signIn: "/login",
    },
    session: {
        strategy: "jwt",
    }
});