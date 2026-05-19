import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./prisma";
import Credentials from "next-auth/providers/credentials";
import { hashPassword, verifyPassword } from "@/utils/password";
import { getUserFromDb } from "@/utils/db";
import { habitCreateSchema } from "@/components/Habits";

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: {
    strategy: "jwt"
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {}
      },
      authorize: async (credentials) => {
        if (!credentials) return null;

        // const {} = await habitCreateSchema.parseAsync(credentials)

        const user = await getUserFromDb(credentials.email);
        const isVerified =
          user?.password &&
          (await verifyPassword(credentials.password, user.password));

        if (!user) {
          // No user found, so this is their first attempt to login
          // Optionally, this is also the place you could do a user registration
          throw new Error("Invalid credentials.");
        }

        // return user object with their profile data
        return user;
      }
    })
  ]
});
