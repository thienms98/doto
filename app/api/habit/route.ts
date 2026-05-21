import { Frequency } from '@/generated/prisma/enums';
import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = (await req.json()) as {
    title: string;
    color: string;
    frequency: string;
    note?: string;
    reminder?: string;
  };

  let frequency: {
    frequency: Frequency;
    targetPerPeriod: number;
  };

  switch (body.frequency) {
    case Frequency.WEEKLY:
      frequency = {
        frequency: Frequency.WEEKLY,
        targetPerPeriod: 7,
      };
      break;
    case Frequency.DAILY:
    default:
      frequency = {
        frequency: Frequency.DAILY,
        targetPerPeriod: 7,
      };
  }

  const users = await prisma.user.findMany();

  const newHabit = await prisma.habit.create({
    data: {
      ...body,
      ...frequency,
      userId: users[0].id,
    },
  });

  return NextResponse.json({ habit: newHabit });
}
