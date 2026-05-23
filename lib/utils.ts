import { clsx, type ClassValue } from 'clsx';
import { NextResponse } from 'next/server';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export enum DOTO_ERROR {
  UNAUTHENTICATED = 'Unauthenticated',
}

export const errResponse = (msg: string, status: number) => {
  switch (msg) {
    case DOTO_ERROR.UNAUTHENTICATED:
      return NextResponse.json({ msg }, { status: 401 });

    default:
      return NextResponse.json({ msg }, { status });
  }
};

export const todayCheck = (date: Date) => {
  const timeCheck = date.getTime();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const prev = today.getTime();
  const next = prev + 60 * 60 * 24 * 1000;

  return prev <= timeCheck && next >= timeCheck;
};
