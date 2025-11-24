import { redirect } from "next/navigation";
import CreateCourseForm from "@/components/CreateCourseForm";
import { getCurrentUser } from "@/lib/auth";

export const metadata = {
  title: "Create Course | NovaLearn"
};

export default async function CreateCoursePage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  if (user.role !== "admin") {
    redirect("/dashboard");
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 space-y-8">
      <div className="space-y-2">
        <p className="text-sm uppercase tracking-[0.4em] text-slate-500">Creator tools</p>
        <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">Publish a new course</h1>
        <p className="text-slate-500">
          Draft content, attach runnable code snippets, and push it live to the tutorials directory in a single
          step.
        </p>
      </div>
      <CreateCourseForm />
    </div>
  );
}


