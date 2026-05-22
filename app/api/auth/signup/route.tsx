import { prisma } from '@/lib/prisma';
import { Credential } from '@/types/auth';
import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = (await req.json()) as Credential;
    const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUND));
    const hashPashword = await bcrypt.hash(password, salt);

    const exist = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (exist) throw new Error('ACCOUNT EXISTED');

    await prisma.user.create({
      data: {
        email,
        password: hashPashword,
      },
    });

    return NextResponse.json({
      msg: 'Account created',
    });
  } catch (err: any) {
    console.log('🚀 ~ POST ~ err:', err);
    if (err.msg === 'ACCOUNT EXISTED')
      return NextResponse.json(
        {
          msg: 'Your email already used',
        },
        { status: 401 },
      );

    return NextResponse.json(
      {
        msg: 'Failed to create account',
      },
      { status: 403 },
    );
  }
}
