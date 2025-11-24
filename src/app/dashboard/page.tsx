import ContinueCard from "@/components/ContinueCard";
import ProgressSummary from "@/components/ProgressSummary";
import TutorialCard from "@/components/TutorialCard";
import ThankYouBanner from "@/components/ThankYouBanner";
import { getCurrentUser } from "@/lib/auth";
import { getTutorials } from "@/lib/tutorialService";

export default async function DashboardPage() {
  const user = await getCurrentUser();
  const tutorials = await getTutorials();

  if (!user) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center space-y-6">
        <h1 className="text-3xl font-semibold">You need an account to see your dashboard.</h1>
        <p className="text-slate-500">
          Sign in to resume tutorials, view history, and sync progress across devices.
        </p>
        <a
          href="/register"
          className="inline-flex items-center justify-center rounded-full bg-brand px-6 py-3 font-semibold text-white"
        >
          Create free account
        </a>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 space-y-10">
      <ThankYouBanner />
      <div>
        <p className="text-sm uppercase tracking-[0.4em] text-slate-500">Welcome back</p>
        <h1 className="text-3xl font-semibold mt-2">{user.name}</h1>
      </div>

      <ContinueCard
        title={tutorials.find((t) => t.slug === user.lastReadSlug)?.title}
        slug={user.lastReadSlug ?? undefined}
        scroll={user.lastScroll ?? undefined}
      />

      <ProgressSummary completed={user.completedLessons} history={user.history} />

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Recommended next</h2>
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

