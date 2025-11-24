interface ContinueCardProps {
  title?: string;
  slug?: string;
  scroll?: number;
}

export default function ContinueCard({ title, slug, scroll }: ContinueCardProps) {
  if (!slug || !title) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 p-6 text-sm text-slate-500">
        Read your first lesson to unlock continue cards.
      </div>
    );
  }

  return (
    <a
      href={`/tutorials/${slug}`}
      className="block rounded-2xl border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-white via-white to-slate-100 dark:from-slate-900 dark:to-slate-800 p-6 shadow-lg"
    >
      <p className="text-sm uppercase text-slate-500">Continue where you left off</p>
      <h3 className="mt-2 text-2xl font-semibold">{title}</h3>
      <p className="text-xs text-slate-500 mt-2">
        Scroll position: {Math.round(Math.min(Math.max(scroll ?? 0, 0), 1) * 100)}%
      </p>
    </a>
  );
}

