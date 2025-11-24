export interface CodeExample {
  language: string;
  code: string;
}

export interface Tutorial {
  _id: string;
  title: string;
  slug: string;
  category: string;
  summary: string;
  content: string;
  codeExamples: CodeExample[];
  order: number;
  previousSlug?: string;
  nextSlug?: string;
}

