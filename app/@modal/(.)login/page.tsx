'use client';

import { LoginForm } from '@/components/layout/Auth';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

const LoginModal = () => {
  const { back } = useRouter();

  return (
    <Dialog open onOpenChange={back}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-4">
            <DialogClose className="cursor-pointer p-1 rounded-full bg-primary">
              <ArrowLeft size={14} />
            </DialogClose>
            <span>Create new habit</span>
          </DialogTitle>
          <DialogDescription className="invisible">Create your new inpressed habit?</DialogDescription>
          <LoginForm />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
