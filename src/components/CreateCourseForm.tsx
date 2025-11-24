"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";

interface CodeExampleFormEntry {
  language: string;
  code: string;
}

interface FormState {
  title: string;
  slug: string;
  category: string;
  summary: string;
  content: string;
  order: string;
}

const initialCodeExample: CodeExampleFormEntry = {
  language: "javascript",
  code: ""
};

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

export default function CreateCourseForm() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>({
    title: "",
    slug: "",
    category: "",
    summary: "",
    content: "",
    order: ""
  });
  const [codeExamples, setCodeExamples] = useState<CodeExampleFormEntry[]>([initialCodeExample]);
  const [slugLocked, setSlugLocked] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (field: keyof FormState, value: string) => {
    setForm((prev) => {
      if (field === "title" && !slugLocked) {
        return { ...prev, title: value, slug: slugify(value) };
      }
      if (field === "slug") {
        setSlugLocked(true);
      }
      return { ...prev, [field]: value };
    });
  };

  const handleCodeExampleChange = (
    index: number,
    field: keyof CodeExampleFormEntry,
    value: string
  ) => {
    setCodeExamples((prev) =>
      prev.map((entry, idx) => (idx === index ? { ...entry, [field]: value } : entry))
    );
  };

  const addCodeExample = () => {
    setCodeExamples((prev) => [...prev, { ...initialCodeExample }]);
  };

  const removeCodeExample = (index: number) => {
    setCodeExamples((prev) => prev.filter((_, idx) => idx !== index));
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setMessage(null);

    const payload = {
      ...form,
      order: form.order ? Number(form.order) : undefined,
      codeExamples: codeExamples.filter((example) => example.language && example.code)
    };

    const res = await fetch("/api/tutorial/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      const data = await res.json();
      setMessage("Course published successfully.");
      router.push(`/tutorials/${data.tutorial.slug}`);
      router.refresh();
    } else {
      const error = await res.json();
      setMessage(error.message ?? "Unable to create course.");
    }

    setSubmitting(false);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {message && (
        <div className="rounded-lg border border-slate-200 bg-white p-4 text-sm text-slate-700">
          {message}
        </div>
      )}

      <section className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-500">Title</label>
          <input
            required
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2"
            value={form.title}
            onChange={(e) => handleChange("title", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-500">Slug</label>
          <input
            required
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 lowercase"
            value={form.slug}
            onChange={(e) => handleChange("slug", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-500">Category</label>
          <input
            required
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2"
            value={form.category}
            onChange={(e) => handleChange("category", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-500">Display order (optional)</label>
          <input
            type="number"
            min="0"
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2"
            value={form.order}
            onChange={(e) => handleChange("order", e.target.value)}
          />
        </div>
      </section>

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-500">Summary</label>
        <textarea
          rows={3}
          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2"
          value={form.summary}
          onChange={(e) => handleChange("summary", e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-500">Content (Markdown supported)</label>
        <textarea
          required
          rows={10}
          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 font-mono text-sm"
          value={form.content}
          onChange={(e) => handleChange("content", e.target.value)}
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-slate-500">Code examples</label>
          <button
            type="button"
            onClick={addCodeExample}
            className="inline-flex items-center gap-1 rounded-full border border-slate-300 px-3 py-1 text-sm hover:bg-slate-100"
          >
            <PlusIcon className="h-4 w-4" /> Add snippet
          </button>
        </div>

        {codeExamples.map((example, index) => (
          <div key={`code-example-${index}`} className="rounded-xl border border-slate-200 bg-white p-4 space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex-1 space-y-1">
                <label className="text-xs uppercase tracking-wide text-slate-500">Language</label>
                <input
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2"
                  value={example.language}
                  onChange={(e) => handleCodeExampleChange(index, "language", e.target.value)}
                />
              </div>
              <button
                type="button"
                onClick={() => removeCodeExample(index)}
                className="rounded-lg border border-slate-200 p-2 text-slate-500 hover:text-rose-500"
                aria-label="Remove code example"
              >
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-1">
              <label className="text-xs uppercase tracking-wide text-slate-500">Code</label>
              <textarea
                rows={6}
                className="w-full rounded-lg border border-slate-200 bg-black/90 text-slate-100 font-mono text-sm px-3 py-2"
                value={example.code}
                onChange={(e) => handleCodeExampleChange(index, "code", e.target.value)}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center justify-center rounded-full bg-brand px-6 py-3 font-semibold text-white shadow hover:bg-brand-dark disabled:opacity-60"
        >
          {submitting ? "Publishing..." : "Publish course"}
        </button>
      </div>
    </form>
  );
}


