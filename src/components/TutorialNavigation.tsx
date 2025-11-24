interface TutorialNavigationProps {
  previousSlug?: string;
  nextSlug?: string;
}

export default function TutorialNavigation({ previousSlug, nextSlug }: TutorialNavigationProps) {
  return (
    <div className="flex flex-wrap gap-3 mt-10">
      {previousSlug && (
        <a
          href={`/tutorials/${previousSlug}`}
          className="flex-1 min-w-[200px] rounded-xl border border-slate-200 dark:border-slate-800 px-4 py-3 text-sm"
        >
          ← Previous
        </a>
      )}
      {nextSlug && (
        <a
          href={`/tutorials/${nextSlug}`}
          className="flex-1 min-w-[200px] rounded-xl border border-slate-200 dark:border-slate-800 px-4 py-3 text-sm text-right"
        >
          Next →
        </a>
      )}
    </div>
  );
}

