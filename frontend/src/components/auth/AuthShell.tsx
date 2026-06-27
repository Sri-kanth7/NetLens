import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card.js';
import { Link } from 'react-router-dom';

export function AuthShell({
  title,
  description,
  children,
  footer
}: {
  title: string;
  description: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.12),_transparent_28%),linear-gradient(180deg,_#020617_0%,_#020617_100%)] text-slate-50">
      <div className="mx-auto grid min-h-screen max-w-7xl items-center gap-8 px-6 py-10 lg:grid-cols-[1.15fr_0.85fr]">
        <section className="relative hidden overflow-hidden rounded-[2rem] border border-slate-800 bg-slate-950/70 p-10 lg:block">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(34,211,238,0.14),_transparent_30%),radial-gradient(circle_at_bottom_left,_rgba(59,130,246,0.12),_transparent_26%)]" />
          <div className="relative z-10 flex h-full min-h-[720px] flex-col justify-between">
            <div className="space-y-6">
              <p className="text-sm font-medium uppercase tracking-[0.4em] text-cyan-300">NetLens</p>
              <h1 className="max-w-xl text-5xl font-semibold tracking-tight text-white xl:text-6xl">
                Monitor. Analyze. Optimize.
              </h1>
              <p className="max-w-xl text-lg leading-8 text-slate-300">
                Premium network intelligence for teams that want a serious operational view of
                internet health, connected devices, alerts, and usage trends.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm text-slate-300">
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
                <div className="text-slate-500">Architecture</div>
                <div className="mt-1 font-medium text-white">Versioned, modular, multi-tenant ready</div>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
                <div className="text-slate-500">Security</div>
                <div className="mt-1 font-medium text-white">JWT, HttpOnly cookies, RBAC, request IDs</div>
              </div>
            </div>
          </div>
        </section>

        <section className="flex justify-center">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="w-full max-w-xl">
            <Card className="border-slate-800/80 bg-slate-950/85">
              <CardHeader>
                <p className="text-sm font-medium uppercase tracking-[0.35em] text-cyan-300">NetLens</p>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
              </CardHeader>
              <CardContent>{children}</CardContent>
            </Card>
            {footer ? <div className="mt-6 text-center text-sm text-slate-400">{footer}</div> : null}
            <div className="mt-4 text-center text-xs text-slate-500 lg:hidden">
              <Link to="/dashboard" className="underline decoration-slate-700 underline-offset-4">
                View dashboard shell
              </Link>
            </div>
          </motion.div>
        </section>
      </div>
    </main>
  );
}
