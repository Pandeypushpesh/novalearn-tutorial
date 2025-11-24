import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import User from "@/lib/models/User";
import { comparePassword, signToken, buildAuthCookie } from "@/lib/auth";
import { sendLoginNotificationEmail } from "@/lib/mailer";

export async function POST(request: Request) {
  const { email, password } = await request.json();
  if (!email || !password) {
    return NextResponse.json({ message: "Missing credentials" }, { status: 400 });
  }

  await connectToDatabase();
  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
  }

  const valid = await comparePassword(password, user.password);
  if (!valid) {
    return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
  }

  const token = signToken({ id: user.id, email: user.email });
  const response = NextResponse.json({ user: { id: user.id, email: user.email } });
  response.headers.append("Set-Cookie", buildAuthCookie(token));

  sendLoginNotificationEmail({ to: user.email, name: user.name }).catch((error) =>
    console.error("Failed to send login email", error)
  );

  return response;
}

