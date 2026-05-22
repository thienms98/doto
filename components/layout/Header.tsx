'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { buttonVariants } from '../ui/button';

const dateFormat = new Intl.DateTimeFormat('vi-VN', {
  weekday: 'long',
  day: '2-digit',
  month: '2-digit',
});
const now = dateFormat.format(Date.now());

const Header = () => {
  const { status } = useSession();

  return (
    <header className="col-span-2 flex justify-between p-3">
      <h1 className="font-bold text-lg leading-7">DOTO</h1>

      <div className="flex gap-3 items-center text-sm">
        <span>{now}</span>

        {status === 'authenticated' ? (
          <Link href="/account" className="size-7 rounded-full bg-white text-black text-xs overflow-hidden flex items-center justify-center cursor-pointer">
            HT
          </Link>
        ) : (
          <Link href="/login" className={buttonVariants()}>
            Login
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
