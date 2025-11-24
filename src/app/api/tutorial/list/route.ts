import { NextResponse } from "next/server";
import { getTutorials } from "@/lib/tutorialService";

export async function GET() {
  const tutorials = await getTutorials();
  return NextResponse.json({ tutorials });
}

