interface ProgressSummaryProps {
  completed: string[];
  history: { slug: string; title: string; visitedAt: string }[];
}

export default function ProgressSummary({ completed, history }: ProgressSummaryProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
        <h3 className="text-lg font-semibold">Completed lessons</h3>
        {completed.length === 0 ? (
          <p className="text-sm text-slate-500 mt-2">No lessons completed yet.</p>
        ) : (
          <ul className="mt-4 space-y-2 text-sm">
            {completed.map((slug) => (
              <li key={slug} className="rounded-md bg-slate-100 dark:bg-slate-800 px-3 py-2">
                {slug}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
        <h3 className="text-lg font-semibold">Reading history</h3>
        {history.length === 0 ? (
          <p className="text-sm text-slate-500 mt-2">No history yet.</p>
        ) : (
          <ul className="mt-4 space-y-2 text-sm">
            {history.slice(0, 5).map((entry) => (
              <li key={entry.slug} className="flex items-center justify-between">
                <a href={`/tutorials/${entry.slug}`} className="text-brand">
                  {entry.title}
                </a>
                <span className="text-xs text-slate-500">
                  {new Date(entry.visitedAt).toLocaleDateString()}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

