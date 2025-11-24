import { Schema, model, models, Document } from "mongoose";

export interface ProgressEntry {
  slug: string;
  title: string;
  visitedAt: Date;
}

export type UserRole = "user" | "admin";

export interface UserDocument extends Document {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  lastReadSlug?: string;
  lastScroll?: number;
  completedLessons: string[];
  history: ProgressEntry[];
}

const ProgressSchema = new Schema<ProgressEntry>(
  {
    slug: { type: String, required: true },
    title: { type: String, required: true },
    visitedAt: { type: Date, default: Date.now }
  },
  { _id: false }
);

const UserSchema = new Schema<UserDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    lastReadSlug: { type: String },
    lastScroll: { type: Number, default: 0 },
    completedLessons: { type: [String], default: [] },
    history: { type: [ProgressSchema], default: [] }
  },
  { timestamps: true }
);

const User = models.User || model<UserDocument>("User", UserSchema);

export default User;

