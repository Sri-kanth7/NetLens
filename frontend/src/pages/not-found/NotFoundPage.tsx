import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-slate-50">
      <div className="max-w-md text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">NetLens</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight">Page not found</h1>
        <p className="mt-4 text-sm leading-6 text-slate-400">
          The route you requested does not exist. Return to the dashboard or sign in again.
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <Link className="rounded-2xl bg-cyan-400 px-4 py-2 text-sm font-medium text-slate-950" to="/dashboard">
            Dashboard
          </Link>
          <Link className="rounded-2xl border border-slate-700 px-4 py-2 text-sm font-medium text-slate-100" to="/login">
            Login
          </Link>
        </div>
      </div>
    </main>
  );
}
