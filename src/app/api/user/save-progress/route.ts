import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { connectToDatabase } from "@/lib/db";
import User from "@/lib/models/User";
import { verifyToken, COOKIE_NAME } from "@/lib/auth";

export async function POST(request: Request) {
  const body = await request.json();
  const { slug, title, scrollPosition = 0 } = body;

  if (!slug || !title) {
    return NextResponse.json({ message: "Missing slug or title" }, { status: 400 });
  }

  const cookieStore = cookies();
  const tokenValue = cookieStore.get(COOKIE_NAME)?.value;

  if (!tokenValue) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const payload = verifyToken(tokenValue);
  if (!payload) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await connectToDatabase();
  const user = await User.findById(payload.id);
  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  user.lastReadSlug = slug;
  user.lastScroll = scrollPosition;
  if (!user.completedLessons.includes(slug)) {
    user.completedLessons.push(slug);
  }
  user.history = [
    { slug, title, visitedAt: new Date() },
    ...user.history.filter((entry) => entry.slug !== slug)
  ].slice(0, 20);

  await user.save();

  return NextResponse.json({ success: true });
}

