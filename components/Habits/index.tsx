'use client';

import { HabitType } from '../layout/Dashboard';
import { useForm } from '@tanstack/react-form';
import { toast } from 'sonner';
import * as z from 'zod';
import { Button, buttonVariants } from '@/components/ui/button';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';

const HabitItem = ({ habit, onHabitChecked }: { habit: HabitType; onHabitChecked: (id: number, checked: boolean) => void }) => {
  return (
    <label
      key={habit.id}
      className={`relative border rounded-md p-2 pl-7 py-3 flex gap-2 items-center cursor-pointer hover:bg-white/10 transition-colors duration-300 overflow-hidden select-none ${habit.isTodayDone ? 'text-black' : ''}`}
    >
      <div
        className={`size-3 absolute top-1/2 -translate-y-1/2 transition-all duration-300 ease-in-out ${habit.isTodayDone ? 'left-1/2 -translate-x-1/2 w-full h-full rounded-none' : 'left-2 rounded-full'}`}
        style={{ background: habit.color }}
      ></div>
      <div className="relative z-1">{habit.title}</div>
      <div className="ml-auto flex items-center gap-2 relative z-1">
        {habit.streak && <div className="">🔥{habit.streak}</div>}
        <input type="checkbox" name="habits" checked={habit.isTodayDone} onChange={(e) => onHabitChecked(habit.id, e.target.checked)} />
      </div>
    </label>
  );
};

export const habitCreateSchema = z.object({
  title: z.string().min(5, 'I think you should know what it is.').max(32, 'Ahh. You reach the limit 😅'),
  color: z.string(),
  frequency: z.string(),
  note: z.string().optional(),
  reminder: z.date().optional(),
});

enum HabitColor {
  VIOLET = '#534ab7',
  GREEN = '#1d9e75',
  ORANGE = '#d85a30',
  BROWN = '#ba7517',
  PINK = '#d4537e',
  BLUE = '#378add',
}

const HabitCreate = () => {
  const form = useForm({
    defaultValues: {
      title: 'Create new habit under presure',
      color: String(HabitColor.BLUE),
      frequency: 'daily',
    },
    validators: {
      onSubmit: habitCreateSchema,
    },
    onSubmit: async ({ value }) => {
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
        <form.Field name="title">
          {(field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Habit name</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onFocus={(e) => e.target.select()}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  placeholder="Login button not working on mobile"
                  autoComplete="off"
                  autoFocus
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>
        <form.Field name="color">
          {(field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Color</FieldLabel>
                <RadioGroup defaultValue="daily" className="flex" onValueChange={field.handleChange}>
                  {Object.values(HabitColor).map((color, index) => (
                    <Label
                      key={color}
                      className={cn('size-6 rounded-full', color === field.state.value ? 'ring-2 ring-foreground ring-offset-2' : '')}
                      style={{ backgroundColor: color }}
                    >
                      <RadioGroupItem value={color} id={`color-${index}`} hidden />
                    </Label>
                  ))}
                </RadioGroup>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>
        <form.Field name="frequency">
          {(field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Frequency</FieldLabel>
                <RadioGroup defaultValue="daily" className="flex" onValueChange={field.handleChange}>
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="daily" id="daily" hidden className="peer" />
                    <Label
                      htmlFor="daily"
                      className={buttonVariants({
                        variant: field.state.value === 'daily' ? 'default' : 'outline',
                      })}
                    >
                      Daily
                    </Label>
                  </div>
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="weekly" id="weekly" hidden className="peer" />
                    <Label
                      htmlFor="weekly"
                      className={buttonVariants({
                        variant: field.state.value === 'weekly' ? 'default' : 'outline',
                      })}
                    >
                      Weekly
                    </Label>
                  </div>
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="monthly" id="monthly" hidden className="peer" />
                    <Label
                      htmlFor="monthly"
                      className={buttonVariants({
                        variant: field.state.value === 'monthly' ? 'default' : 'outline',
                      })}
                    >
                      Monthly
                    </Label>
                  </div>
                </RadioGroup>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>
        <form.Field name="note">
          {(field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Note (optional)</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onFocus={(e) => e.target.select()}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  placeholder="Ex: 30 minutes"
                  autoComplete="off"
                  autoFocus
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>
        <form.Field name="reminder">
          {(field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Reminder</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onFocus={(e) => e.target.select()}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  placeholder="08:00"
                  autoComplete="off"
                  autoFocus
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>
      </FieldGroup>
      <Field orientation="horizontal" className="flex justify-end">
        <Button type="button" variant="outline" onClick={() => form.reset()}>
          Reset
        </Button>
        <Button type="submit" form="bug-report-form">
          Submit
        </Button>
      </Field>
    </form>
  );
};

export { HabitItem, HabitCreate };
