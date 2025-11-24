import TutorialCard from "@/components/TutorialCard";
import { getTutorials } from "@/lib/tutorialService";

interface Props {
  searchParams: { q?: string };
}

export default async function TutorialsPage({ searchParams }: Props) {
  const tutorials = await getTutorials(searchParams.q);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 space-y-6">
      <header className="flex flex-col gap-2">
        <p className="text-sm uppercase tracking-[0.4em] text-slate-500">All tutorials</p>
        <h1 className="text-3xl font-semibold">Browse {tutorials.length} lessons</h1>
        {searchParams.q && (
          <p className="text-sm text-slate-500">Results for “{searchParams.q}”</p>
        )}
      </header>
      <div className="grid gap-6 md:grid-cols-2">
        {tutorials.map((tutorial) => (
          <TutorialCard
            key={tutorial.slug}
            title={tutorial.title}
            summary={tutorial.summary}
            category={tutorial.category}
            slug={tutorial.slug}
          />
        ))}
      </div>
    </div>
  );
}

