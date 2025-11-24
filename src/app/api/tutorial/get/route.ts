import { NextResponse } from "next/server";
import { getTutorialBySlug, getTutorials } from "@/lib/tutorialService";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");
  const query = searchParams.get("q");

  if (slug) {
    const tutorial = await getTutorialBySlug(slug);
    if (!tutorial) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ tutorial });
  }

  const tutorials = await getTutorials(query ?? undefined);
  return NextResponse.json({ tutorials });
}

