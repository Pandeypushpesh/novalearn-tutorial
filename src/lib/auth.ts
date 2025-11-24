import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import User from "./models/User";
import { connectToDatabase } from "./db";

const JWT_SECRET = process.env.JWT_SECRET ?? "dev-secret-change-me";
const COOKIE_NAME = "novalearn-token";
const TOKEN_MAX_AGE = 60 * 60 * 24 * 7; // 7 days
const ADMIN_EMAILS = (process.env.ADMIN_EMAILS ?? "")
  .split(",")
  .map((email) => email.trim().toLowerCase())
  .filter(Boolean);

export function isAdminEmail(email: string) {
  if (!email) return false;
  return ADMIN_EMAILS.includes(email.trim().toLowerCase());
}

export async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export function comparePassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export function signToken(payload: { id: string; email: string }) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: TOKEN_MAX_AGE });
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET) as { id: string; email: string };
  } catch {
    return null;
  }
}

export function buildAuthCookie(token: string) {
  return `${COOKIE_NAME}=${token}; HttpOnly; Path=/; Max-Age=${TOKEN_MAX_AGE}; SameSite=Lax; ${
    process.env.NODE_ENV === "production" ? "Secure" : ""
  }`;
}

export function clearAuthCookie() {
  return `${COOKIE_NAME}=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax; ${
    process.env.NODE_ENV === "production" ? "Secure" : ""
  }`;
}

export interface SafeUser {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  lastReadSlug?: string;
  lastScroll?: number;
  completedLessons: string[];
  history: { slug: string; title: string; visitedAt: string }[];
}

export async function getCurrentUser(): Promise<SafeUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) {
    return null;
  }

  const payload = verifyToken(token);
  if (!payload) {
    return null;
  }

  await connectToDatabase();
  const user = await User.findById(payload.id).lean();
  if (!user) return null;

  const role = (user.role as "user" | "admin" | undefined) ?? (isAdminEmail(user.email) ? "admin" : "user");

  return {
    _id: user._id.toString(),
    name: user.name,
    email: user.email,
    role,
    lastReadSlug: user.lastReadSlug,
    lastScroll: user.lastScroll,
    completedLessons: user.completedLessons ?? [],
    history: (user.history ?? []).map((entry) => ({
      slug: entry.slug,
      title: entry.title,
      visitedAt: entry.visitedAt instanceof Date ? entry.visitedAt.toISOString() : new Date(entry.visitedAt).toISOString()
    }))
  };
}

export { COOKIE_NAME };

