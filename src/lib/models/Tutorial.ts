import { Schema, model, models, Document } from "mongoose";

export interface CodeExample {
  language: string;
  code: string;
}

export interface TutorialDocument extends Document {
  title: string;
  slug: string;
  category: string;
  content: string;
  summary: string;
  codeExamples: CodeExample[];
  order: number;
  previousSlug?: string;
  nextSlug?: string;
}

const CodeExampleSchema = new Schema<CodeExample>(
  {
    language: { type: String, required: true },
    code: { type: String, required: true }
  },
  { _id: false }
);

const TutorialSchema = new Schema<TutorialDocument>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    summary: { type: String, default: "" },
    content: { type: String, required: true },
    codeExamples: { type: [CodeExampleSchema], default: [] },
    order: { type: Number, default: 0 },
    previousSlug: { type: String },
    nextSlug: { type: String }
  },
  { timestamps: true }
);

const Tutorial = models.Tutorial || model<TutorialDocument>("Tutorial", TutorialSchema);

export default Tutorial;

