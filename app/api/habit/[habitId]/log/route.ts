import { prisma } from '@/lib/prisma';
import { errResponse, successResponse } from '@/lib/utils';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest, { params }: { params: Promise<{ habitId: string }> }) {
  try {
    const { habitId } = await params;
    const { isTodayDone } = (await req.json()) as { isTodayDone: boolean };

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (isTodayDone) {
      await prisma.habitLog.create({
        data: {
          habitId: Number(habitId),
        },
      });
    } else {
      const prev = today.getTime();
      const next = prev + 60 * 60 * 24 * 1000;

      await prisma.habitLog.deleteMany({
        where: {
          habitId: Number(habitId),
          completedAt: {
            gte: new Date(prev),
            lte: new Date(next),
          },
        },
      });
    }

    return successResponse({ msg: 'Checked change' });
  } catch (err: any) {
    return errResponse(err.message);
  }
}
