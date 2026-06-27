import { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';
import { AuthShell } from '../../components/auth/AuthShell.js';
import { Button } from '../../components/ui/button.js';
import { Input } from '../../components/ui/input.js';
import { Label } from '../../components/ui/label.js';
import { useAuth } from '../../context/auth-context.js';
import { login } from '../../services/auth.service.js';
import { loginSchema } from './auth.schemas.js';
import { Link } from 'react-router-dom';

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { applySession, setAuthError } = useAuth();
  const from = useMemo(() => (location.state as { from?: string } | undefined)?.from ?? '/dashboard', [location.state]);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (session) => {
      applySession(session);
      setAuthError(null);
      navigate(from, { replace: true });
    },
    onError: (error) => {
      form.setError('root', { message: error instanceof Error ? error.message : 'Login failed.' });
      setAuthError(error instanceof Error ? error.message : 'Login failed.');
    }
  });

  return (
    <AuthShell
      title="Welcome back"
      description="Sign in to monitor network health, devices, alerts, and analytics from one secure dashboard."
      footer={<span>New here? <Link className="text-cyan-300 underline" to="/register">Create an account</Link></span>}
    >
      <form
        className="space-y-5"
        onSubmit={form.handleSubmit((values) => loginMutation.mutate(values))}
      >
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="you@company.com" {...form.register('email')} />
          {form.formState.errors.email ? (
            <p className="text-xs text-rose-300">{form.formState.errors.email.message}</p>
          ) : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" placeholder="••••••••" {...form.register('password')} />
          {form.formState.errors.password ? (
            <p className="text-xs text-rose-300">{form.formState.errors.password.message}</p>
          ) : null}
        </div>

        {form.formState.errors.root ? (
          <p className="rounded-2xl border border-rose-900/60 bg-rose-950/30 px-4 py-3 text-sm text-rose-200">
            {form.formState.errors.root.message}
          </p>
        ) : null}

        <div className="flex items-center justify-between gap-4">
          <a className="text-sm text-slate-400 underline-offset-4 hover:text-cyan-300 hover:underline" href="/forgot-password">
            Forgot password?
          </a>
          <Button type="submit" className="min-w-32" disabled={loginMutation.isPending}>
            {loginMutation.isPending ? 'Signing in...' : 'Sign in'}
          </Button>
        </div>
      </form>
    </AuthShell>
  );
}
