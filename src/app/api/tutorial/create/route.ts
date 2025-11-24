import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import Tutorial from "@/lib/models/Tutorial";
import { createTutorial } from "@/lib/tutorialService";
import type { CodeExample } from "@/types/tutorial";

function parseOrder(value: unknown): number | undefined {
  if (typeof value === "number" && !Number.isNaN(value)) {
    return value;
  }

  if (typeof value === "string") {
    const trimmed = value.trim();
    if (!trimmed) return undefined;
    const parsed = Number(trimmed);
    return Number.isFinite(parsed) ? parsed : undefined;
  }

  return undefined;
}

function sanitizeCodeExamples(entries: unknown): CodeExample[] {
  if (!Array.isArray(entries)) return [];
  return entries
    .map((entry) => {
      if (!entry || typeof entry !== "object") {
        return { language: "", code: "" };
      }
      const record = entry as Record<string, unknown>;
      return {
        language: typeof record.language === "string" ? record.language.trim() : "",
        code: typeof record.code === "string" ? record.code : ""
      };
    })
    .filter((example) => example.language && example.code);
}

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  if (user.role !== "admin") {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  const body = await request.json();
  const { title, slug, category, summary, content, codeExamples, order, previousSlug, nextSlug } =
    body ?? {};

  if (!title || !slug || !category || !content) {
    return NextResponse.json({ message: "Missing required fields." }, { status: 400 });
  }

  await connectToDatabase();
  const existing = await Tutorial.findOne({ slug });
  if (existing) {
    return NextResponse.json({ message: "Slug already exists. Choose a different slug." }, { status: 409 });
  }

  const sanitizedExamples = sanitizeCodeExamples(codeExamples);

  const tutorial = await createTutorial({
    title: title.trim(),
    slug: slug.trim(),
    category: category.trim(),
    summary,
    content,
    codeExamples: sanitizedExamples,
    order: parseOrder(order),
    previousSlug: previousSlug?.trim() || undefined,
    nextSlug: nextSlug?.trim() || undefined
  });

  return NextResponse.json({ tutorial }, { status: 201 });
}


