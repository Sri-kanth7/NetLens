import { Link } from 'react-router-dom';

export function ErrorState({ message }: { message: string }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-slate-50">
      <div className="max-w-md rounded-3xl border border-rose-900/60 bg-rose-950/30 p-6 text-center shadow-2xl shadow-rose-950/20">
        <h1 className="text-xl font-semibold text-white">Something went wrong</h1>
        <p className="mt-3 text-sm leading-6 text-rose-200/90">{message}</p>
        <Link
          to="/login"
          className="mt-6 inline-flex rounded-2xl bg-white px-4 py-2 text-sm font-medium text-slate-950 transition hover:bg-slate-200"
        >
          Back to login
        </Link>
      </div>
    </div>
  );
}
