'use client';

import { LoginForm } from '@/components/layout/Auth';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export default function BugReportForm() {
  return (
    <Card className="container mx-auto mt-8">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Join us to not miss your habit</CardDescription>
      </CardHeader>
      <CardContent>
        <LoginForm />
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
