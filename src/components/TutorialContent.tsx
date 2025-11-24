"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface TutorialContentProps {
  content: string;
}

export default function TutorialContent({ content }: TutorialContentProps) {
  return (
    <article className="prose dark:prose-invert max-w-none">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </article>
  );
}

