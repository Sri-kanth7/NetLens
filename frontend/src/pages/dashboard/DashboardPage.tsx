import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { Button } from '../../components/ui/button.js';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card.js';
import { useAuth } from '../../context/auth-context.js';
import { logout } from '../../services/auth.service.js';

export function DashboardPage() {
  const { user, clearSession } = useAuth();
  const navigate = useNavigate();

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      clearSession();
      navigate('/login', { replace: true });
    }
  });

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-8 text-slate-50">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="flex flex-col justify-between gap-4 rounded-3xl border border-slate-800 bg-slate-900/70 p-6 lg:flex-row lg:items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">NetLens Dashboard</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white">
              Welcome, {user?.fullName ?? 'Operator'}
            </h1>
            <p className="mt-2 text-sm text-slate-400">
              A production-ready network intelligence workspace ready for Version 1 expansion.
            </p>
          </div>
          <Button variant="secondary" onClick={() => logoutMutation.mutate({})} disabled={logoutMutation.isPending}>
            {logoutMutation.isPending ? 'Signing out...' : 'Logout'}
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            { label: 'Internet Status', value: 'Online' },
            { label: 'Network Health', value: '92%' },
            { label: 'Connected Devices', value: '18' },
            { label: 'Current Ping', value: '12 ms' }
          ].map((card) => (
            <Card key={card.label} className="bg-slate-900/70">
              <CardHeader>
                <CardDescription>{card.label}</CardDescription>
                <CardTitle className="text-3xl">{card.value}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-slate-400">
                Foundation cards for live monitoring, analytics, and alert drill-downs.
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
