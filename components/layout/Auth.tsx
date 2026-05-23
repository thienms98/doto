import * as React from 'react';
import { AnyFieldApi, useForm } from '@tanstack/react-form';
import { toast } from 'sonner';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { InputGroup, InputGroupAddon } from '@/components/ui/input-group';
import { EyeIcon } from 'lucide-react';

import { signIn } from 'next-auth/react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

const formSchema = z.object({
  email: z.email({ message: 'Please enter a valid email address.' }),
  password: z.string(),
  // .min(8, { message: 'Password must be at least 8 characters long' })
  // .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
  // .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
  // .regex(/\d/, { message: 'Password must contain at least one number' })
  // .regex(/[\W_]/, { message: 'Password must contain at least one special character' }),
});

export function LoginForm() {
  const { callbackUrl = '/' } = useParams() as { callbackUrl?: string };

  const form = useForm({
    defaultValues: {
      email: 'admin@gmail.com',
      password: '123456',
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const res = await signIn('credentials', {
        callbackUrl,
        ...value,
      });

      console.log(res);

      toast('You submitted the following values:', {
        description: (
          <pre className="mt-2 w-[320px] overflow-x-auto rounded-md bg-code p-4 text-code-foreground">
            <code>{JSON.stringify(value, null, 2)}</code>
          </pre>
        ),
        position: 'bottom-right',
        classNames: {
          content: 'flex flex-col gap-2',
        },
        style: {
          '--border-radius': 'calc(var(--radius)  + 4px)',
        } as React.CSSProperties,
      });
    },
  });

  return (
    <form
      id="bug-report-form"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <FieldGroup>
        <form.Field name="email">
          {(field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  placeholder="Johndoe@gmail.com"
                  autoComplete="off"
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>
        <form.Field name="password">{(field) => <PasswordInputGroup field={field} />}</form.Field>

        <Field>
          <Link href="/signup">Signup</Link>
        </Field>
        <Field>
          <Button type="submit" form="bug-report-form" className="ml-auto">
            Submit
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}

export function SignupForm() {
  const form = useForm({
    defaultValues: {
      email: 'admin@gmail.com',
      password: '123456',
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        body: JSON.stringify(value),
      });

      toast('You submitted the following values:', {
        description: (
          <pre className="mt-2 w-[320px] overflow-x-auto rounded-md bg-code p-4 text-code-foreground">
            <code>{JSON.stringify(await res.json(), null, 2)}</code>
          </pre>
        ),
        position: 'bottom-right',
        classNames: {
          content: 'flex flex-col gap-2',
        },
        style: {
          '--border-radius': 'calc(var(--radius)  + 4px)',
        } as React.CSSProperties,
      });
    },
  });

  return (
    <form
      id="bug-report-form"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <FieldGroup>
        <form.Field name="email">
          {(field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  placeholder="Johndoe@gmail.com"
                  autoComplete="off"
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>
        <form.Field name="password">{(field) => <PasswordInputGroup field={field} />}</form.Field>

        <Field orientation="horizontal">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Reset
          </Button>
          <Button type="submit" form="bug-report-form">
            Submit
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}

export function PasswordInputGroup({ field }: { field: AnyFieldApi }) {
  const [visible, setVisible] = React.useState(false);

  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={field.name}>Password</FieldLabel>
      <InputGroup>
        <Input
          id={field.name}
          name={field.name}
          value={field.state.value}
          onBlur={field.handleBlur}
          onChange={(e) => field.handleChange(e.target.value)}
          aria-invalid={isInvalid}
          placeholder="******"
          autoComplete="off"
          type={visible ? 'text' : 'password'}
          className=""
        />
        <InputGroupAddon align={'inline-end'} onClick={() => setVisible((prev) => !prev)}>
          <EyeIcon />
        </InputGroupAddon>
      </InputGroup>
      <FieldDescription>Include steps to reproduce, expected behavior, and what actually happened.</FieldDescription>
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  );
}
