import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from './prisma';
import Credentials from 'next-auth/providers/credentials';
import { verifyPassword } from '@/utils/password';
import { getUserFromDb } from '@/utils/db';

const handler = NextAuth({
  session: {
    strategy: 'jwt',
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        if (!credentials) return null;

        const user = await getUserFromDb(credentials.email);
        const isVerified = user?.password && (await verifyPassword(credentials.password, user.password));

        if (!user) {
          // No user found, so this is their first attempt to login
          // Optionally, this is also the place you could do a user registration
          throw new Error('Invalid credentials.');
        }

        // return user object with their profile data
        return user;
      },
    }),
  ],
});

export default handler;
export const { handlers, auth, signIn, signOut } = handler;
