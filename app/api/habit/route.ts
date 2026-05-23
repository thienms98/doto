import { Frequency } from '@/generated/prisma/enums';
import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { authenticate } from '@/lib/auth';
import { DOTO_ERROR, errResponse } from '@/lib/utils';

export async function GET() {
  try {
    const user = await authenticate();

    if (!user.email) throw new Error(DOTO_ERROR.UNAUTHENTICATED);

    const habits = await prisma.habit.findMany({
      where: {
        user: {
          email: user.email,
        },
      },
      include: {
        logs: {
          orderBy: {
            completedAt: 'desc',
          },
        },
      },
      take: 6,
    });

    return NextResponse.json(habits);
  } catch (err: any) {
    return NextResponse.json({ msg: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await authenticate();
    if (!user.email) throw new Error(DOTO_ERROR.UNAUTHENTICATED);

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

    const newHabit = await prisma.habit.create({
      data: {
        ...body,
        ...frequency,
        user: {
          connect: {
            email: user.email,
          },
        },
      },
    });

    return NextResponse.json({ habit: newHabit });
  } catch (err: any) {
    return errResponse(err.message, 500);
  }
}
