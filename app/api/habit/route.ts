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

    const nomarlizedHabits = habits.map((habit) => {
      let streak = 0;
      let isTodayDone = false;
      const interval = 24 * 60 * 60 * 1000;
      const today = new Date().setHours(0, 0, 0, 0);

      const logTimes = habit.logs.map((log) => new Date(log.completedAt).setHours(0, 0, 0, 0)).sort((a, b) => b - a);
      for (let i = 0; i < logTimes.length - 1; i++) {
        if (today === logTimes[i]) isTodayDone = true;

        if (logTimes[i] - logTimes[i + 1] > interval) break;
        streak++;
      }

      return { ...habit, streak, isTodayDone };
    });

    return NextResponse.json(nomarlizedHabits);
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
