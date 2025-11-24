import Link from "next/link";

interface TutorialCardProps {
  title: string;
  summary: string;
  category: string;
  slug: string;
}

export default function TutorialCard({ title, summary, category, slug }: TutorialCardProps) {
  return (
    <Link
      href={`/tutorials/${slug}`}
      className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 hover:-translate-y-0.5 transition shadow-sm hover:shadow-xl"
    >
      <p className="text-xs uppercase tracking-wide text-brand">{category}</p>
      <h3 className="mt-2 text-xl font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-slate-500">{summary}</p>
      <span className="mt-4 inline-flex items-center text-sm font-medium text-brand">
        Read lesson →
      </span>
    </Link>
  );
}

