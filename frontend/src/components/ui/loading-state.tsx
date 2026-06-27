export function LoadingState({ label = 'Loading' }: { label?: string }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-50">
      <div className="flex items-center gap-3 rounded-2xl border border-slate-800 bg-slate-900/80 px-5 py-4 text-sm text-slate-300 shadow-2xl shadow-slate-950/30">
        <span className="h-3 w-3 animate-pulse rounded-full bg-cyan-300" />
        {label}
      </div>
    </div>
  );
}
