import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';
import { AuthShell } from '../../components/auth/AuthShell.js';
import { Button } from '../../components/ui/button.js';
import { Input } from '../../components/ui/input.js';
import { Label } from '../../components/ui/label.js';
import { useAuth } from '../../context/auth-context.js';
import { register as registerUser } from '../../services/auth.service.js';
import { registerSchema } from './auth.schemas.js';
import { Link } from 'react-router-dom';

export function RegisterPage() {
  const navigate = useNavigate();
  const { applySession } = useAuth();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      role: 'viewer'
    }
  });

  const registerMutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (session) => {
      applySession(session);
      navigate('/dashboard', { replace: true });
    },
    onError: (error) => {
      form.setError('root', { message: error instanceof Error ? error.message : 'Registration failed.' });
    }
  });

  return (
    <AuthShell
      title="Create your NetLens account"
      description="Start with a secure account and keep the architecture ready for organizations, collectors, and future enterprise controls."
      footer={<span>Already have an account? <Link className="text-cyan-300 underline" to="/login">Sign in</Link></span>}
    >
      <form className="space-y-5" onSubmit={form.handleSubmit((values) => registerMutation.mutate(values))}>
        <div className="space-y-2">
          <Label htmlFor="fullName">Full name</Label>
          <Input id="fullName" placeholder="Avery Chen" {...form.register('fullName')} />
          {form.formState.errors.fullName ? <p className="text-xs text-rose-300">{form.formState.errors.fullName.message}</p> : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="you@company.com" {...form.register('email')} />
          {form.formState.errors.email ? <p className="text-xs text-rose-300">{form.formState.errors.email.message}</p> : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" placeholder="Minimum 8 characters" {...form.register('password')} />
          {form.formState.errors.password ? <p className="text-xs text-rose-300">{form.formState.errors.password.message}</p> : null}
        </div>

        {form.formState.errors.root ? (
          <p className="rounded-2xl border border-rose-900/60 bg-rose-950/30 px-4 py-3 text-sm text-rose-200">
            {form.formState.errors.root.message}
          </p>
        ) : null}

        <Button type="submit" className="w-full" disabled={registerMutation.isPending}>
          {registerMutation.isPending ? 'Creating account...' : 'Create account'}
        </Button>
      </form>
    </AuthShell>
  );
}
