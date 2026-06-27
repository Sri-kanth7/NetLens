import { useMutation } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';
import { AuthShell } from '../../components/auth/AuthShell.js';
import { Button } from '../../components/ui/button.js';
import { Input } from '../../components/ui/input.js';
import { Label } from '../../components/ui/label.js';
import { resetPassword } from '../../services/auth.service.js';
import { resetPasswordSchema } from './auth.schemas.js';
import { Link } from 'react-router-dom';

export function ResetPasswordPage() {
  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      token: '',
      password: ''
    }
  });

  const resetMutation = useMutation({
    mutationFn: resetPassword,
    onSuccess: (response) => {
      form.reset();
      form.setError('root', { message: response.message });
    },
    onError: (error) => {
      form.setError('root', { message: error instanceof Error ? error.message : 'Unable to reset password.' });
    }
  });

  return (
    <AuthShell
      title="Set a new password"
      description="Complete the password recovery flow using your reset token."
      footer={<span>Return to <Link className="text-cyan-300 underline" to="/login">sign in</Link></span>}
    >
      <form className="space-y-5" onSubmit={form.handleSubmit((values) => resetMutation.mutate(values))}>
        <div className="space-y-2">
          <Label htmlFor="token">Reset token</Label>
          <Input id="token" placeholder="Paste the reset token" {...form.register('token')} />
          {form.formState.errors.token ? <p className="text-xs text-rose-300">{form.formState.errors.token.message}</p> : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">New password</Label>
          <Input id="password" type="password" placeholder="Minimum 8 characters" {...form.register('password')} />
          {form.formState.errors.password ? <p className="text-xs text-rose-300">{form.formState.errors.password.message}</p> : null}
        </div>

        {form.formState.errors.root ? (
          <p className="rounded-2xl border border-emerald-900/60 bg-emerald-950/30 px-4 py-3 text-sm text-emerald-200">
            {form.formState.errors.root.message}
          </p>
        ) : null}

        <Button type="submit" className="w-full" disabled={resetMutation.isPending}>
          {resetMutation.isPending ? 'Resetting password...' : 'Reset password'}
        </Button>
      </form>
    </AuthShell>
  );
}
