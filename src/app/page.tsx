import ContinueCard from "@/components/ContinueCard";
import TutorialCard from "@/components/TutorialCard";
import { getCurrentUser } from "@/lib/auth";
import { getTutorials } from "@/lib/tutorialService";

export default async function HomePage() {
  const [user, tutorials] = await Promise.all([getCurrentUser(), getTutorials()]);
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 space-y-12">
      <section className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-10 flex flex-col gap-6 shadow-2xl">
        <div>
          <p className="text-sm uppercase tracking-[0.4em] text-slate-400">Tutorial platform</p>
          <h1 className="mt-4 text-4xl md:text-5xl font-semibold">
            Learn the full web stack with live code boxes.
          </h1>
          <p className="mt-4 text-lg text-slate-300">
            Track your progress, continue where you left off, and practice with interactive editors.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl bg-white/5 p-4">
            <p className="text-sm">Lessons</p>
            <p className="text-3xl font-semibold">{tutorials.length}</p>
          </div>
          <div className="rounded-2xl bg-white/5 p-4">
            <p className="text-sm">Completed</p>
            <p className="text-3xl font-semibold">{user?.completedLessons?.length ?? 0}</p>
          </div>
          <div className="rounded-2xl bg-white/5 p-4">
            <p className="text-sm">Categories</p>
            <p className="text-3xl font-semibold">
              {Array.from(new Set(tutorials.map((t) => t.category))).length}
            </p>
          </div>
        </div>
      </section>

      <section>
        <ContinueCard
          title={tutorials.find((t) => t.slug === user?.lastReadSlug)?.title}
          slug={user?.lastReadSlug}
          scroll={user?.lastScroll}
        />
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Trending tutorials</h2>
          <a href="/tutorials" className="text-sm font-medium text-brand">
            View all →
          </a>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {tutorials.slice(0, 4).map((tutorial) => (
            <TutorialCard
              key={tutorial.slug}
              title={tutorial.title}
              summary={tutorial.summary}
              category={tutorial.category}
              slug={tutorial.slug}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

