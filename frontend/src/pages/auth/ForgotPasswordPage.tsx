import { useMutation } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';
import { AuthShell } from '../../components/auth/AuthShell.js';
import { Button } from '../../components/ui/button.js';
import { Input } from '../../components/ui/input.js';
import { Label } from '../../components/ui/label.js';
import { forgotPassword } from '../../services/auth.service.js';
import { forgotPasswordSchema } from './auth.schemas.js';
import { Link } from 'react-router-dom';

export function ForgotPasswordPage() {
  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' }
  });

  const forgotMutation = useMutation({
    mutationFn: forgotPassword,
    onSuccess: (response) => {
      form.setValue('email', form.getValues('email'));
      form.setError('root', { message: response.message });
    },
    onError: (error) => {
      form.setError('root', { message: error instanceof Error ? error.message : 'Unable to start password recovery.' });
    }
  });

  return (
    <AuthShell
      title="Reset your password"
      description="Request a secure reset flow for your NetLens account."
      footer={<span>Back to <Link className="text-cyan-300 underline" to="/login">sign in</Link></span>}
    >
      <form className="space-y-5" onSubmit={form.handleSubmit((values) => forgotMutation.mutate(values))}>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="you@company.com" {...form.register('email')} />
          {form.formState.errors.email ? <p className="text-xs text-rose-300">{form.formState.errors.email.message}</p> : null}
        </div>

        {form.formState.errors.root ? (
          <p className="rounded-2xl border border-emerald-900/60 bg-emerald-950/30 px-4 py-3 text-sm text-emerald-200">
            {form.formState.errors.root.message}
          </p>
        ) : null}

        <Button type="submit" className="w-full" disabled={forgotMutation.isPending}>
          {forgotMutation.isPending ? 'Sending request...' : 'Send reset request'}
        </Button>
      </form>
    </AuthShell>
  );
}
