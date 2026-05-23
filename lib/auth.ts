import NextAuth, { getServerSession } from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from './prisma';
import Credentials from 'next-auth/providers/credentials';
import { verifyPassword } from '@/utils/password';
import { getUserFromDb } from '@/utils/db';
import { DOTO_ERROR } from './utils';

const handler = NextAuth({
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
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
        if (!credentials?.email || !credentials?.email) throw new Error('Invalid credentials.');

        const user = await getUserFromDb(credentials.email);
        if (!user) throw new Error('Invalid credentials.');

        const { password, ...rest } = user;
        const isVerified = password && (await verifyPassword(credentials.password, password));

        if (!isVerified) {
          throw new Error('Your email or password is not correct');
        }

        return rest;
      },
    }),
  ],
});

export const authenticate = async () => {
  const session = await getServerSession();

  const isExpired = session?.expires && new Date(session.expires).getTime() < Date.now();

  if (!session?.user || isExpired) throw new Error(DOTO_ERROR.UNAUTHENTICATED);

  return session.user;
};

export default handler;
export const { handlers, auth, signIn, signOut } = handler;
