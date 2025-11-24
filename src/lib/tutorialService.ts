import { connectToDatabase } from "./db";
import Tutorial from "./models/Tutorial";
import type { Tutorial as TutorialType, CodeExample } from "@/types/tutorial";
import { seedTutorialsIfNeeded } from "./tutorialSeeder";

export interface CreateTutorialInput {
  title: string;
  slug: string;
  category: string;
  summary?: string;
  content: string;
  codeExamples?: CodeExample[];
  order?: number;
  previousSlug?: string;
  nextSlug?: string;
}

export function mapTutorial(doc: any): TutorialType {
  return {
    _id: doc._id.toString(),
    title: doc.title,
    slug: doc.slug,
    category: doc.category,
    summary: doc.summary,
    content: doc.content,
    codeExamples: doc.codeExamples ?? [],
    order: doc.order,
    previousSlug: doc.previousSlug,
    nextSlug: doc.nextSlug
  };
}

export async function getTutorials(search?: string): Promise<TutorialType[]> {
  await connectToDatabase();
  await seedTutorialsIfNeeded();

  const query = search
    ? {
        $or: [
          { title: { $regex: search, $options: "i" } },
          { content: { $regex: search, $options: "i" } },
          { category: { $regex: search, $options: "i" } }
        ]
      }
    : {};

  const results = await Tutorial.find(query).sort({ order: 1 }).lean();
  return results.map(mapTutorial);
}

export async function getTutorialBySlug(slug: string): Promise<TutorialType | null> {
  await connectToDatabase();
  await seedTutorialsIfNeeded();
  const tutorial = await Tutorial.findOne({ slug }).lean();
  return tutorial ? mapTutorial(tutorial) : null;
}

export async function createTutorial(data: CreateTutorialInput): Promise<TutorialType> {
  await connectToDatabase();

  const doc = await Tutorial.create({
    title: data.title,
    slug: data.slug,
    category: data.category,
    summary: data.summary ?? "",
    content: data.content,
    codeExamples: data.codeExamples ?? [],
    order: data.order ?? 0,
    previousSlug: data.previousSlug,
    nextSlug: data.nextSlug
  });

  return mapTutorial(doc);
}

