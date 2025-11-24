import Sidebar from "@/components/Sidebar";
import TutorialReader from "@/components/TutorialReader";
import { getCurrentUser } from "@/lib/auth";
import { getTutorialBySlug } from "@/lib/tutorialService";
import { notFound } from "next/navigation";

interface Props {
  params: { slug: string };
}

export default async function TutorialSlugPage({ params }: Props) {
  const tutorial = await getTutorialBySlug(params.slug);
  if (!tutorial) {
    notFound();
  }
  const user = await getCurrentUser();

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 px-6 py-10">
        <div className="max-w-3xl mx-auto space-y-4">
          <div>
            <p className="text-sm uppercase tracking-[0.4em] text-slate-500">
              {tutorial.category}
            </p>
            <h1 className="text-3xl font-semibold">{tutorial.title}</h1>
          </div>
          <TutorialReader tutorial={tutorial} enableProgress={Boolean(user)} />
        </div>
      </div>
    </div>
  );
}

