import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import User from "@/lib/models/User";
import { hashPassword, signToken, buildAuthCookie, isAdminEmail } from "@/lib/auth";

export async function POST(request: Request) {
  const { name, email, password } = await request.json();
  if (!name || !email || !password) {
    return NextResponse.json({ message: "Missing fields" }, { status: 400 });
  }

  await connectToDatabase();
  const existing = await User.findOne({ email });
  if (existing) {
    return NextResponse.json({ message: "Email already registered." }, { status: 400 });
  }

  const hashed = await hashPassword(password);
  const role = isAdminEmail(email) ? "admin" : "user";
  const user = await User.create({
    name,
    email,
    password: hashed,
    role,
    completedLessons: []
  });

  const token = signToken({ id: user.id, email: user.email });
  const response = NextResponse.json({ user: { id: user.id, email: user.email } }, { status: 201 });
  response.headers.append("Set-Cookie", buildAuthCookie(token));
  return response;
}

