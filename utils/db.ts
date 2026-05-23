import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export const getUserFromDb = async (email: string) => {
  return await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
      email: true,
      name: true,
      image: true,
      password: true,
    },
  });
};

export const createUser = async (email: string, password: string, name: string) => {
  const salt = await bcrypt.genSalt(12);
  const hashedPw = await bcrypt.hash(password, salt);

  await prisma.user.create({
    data: {
      email,
      password: hashedPw,
      name,
    },
  });
};
