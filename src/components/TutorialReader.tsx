"use client";

import CodeBox from "./CodeBox";
import TutorialContent from "./TutorialContent";
import TutorialNavigation from "./TutorialNavigation";
import { useProgressSaver } from "@/hooks/useProgressSaver";

interface TutorialReaderProps {
  tutorial: {
    title: string;
    slug: string;
    content: string;
    codeExamples: { language: string; code: string }[];
    previousSlug?: string;
    nextSlug?: string;
  };
  enableProgress: boolean;
}

export default function TutorialReader({ tutorial, enableProgress }: TutorialReaderProps) {
  useProgressSaver({ slug: tutorial.slug, title: tutorial.title, enabled: enableProgress });

  return (
    <div className="space-y-8">
      <TutorialContent content={tutorial.content} />
      {(tutorial.codeExamples ?? []).map((example, index) => (
        <CodeBox key={`${example.language}-${index}`} code={example.code} language={example.language} />
      ))}
      <TutorialNavigation
        previousSlug={tutorial.previousSlug}
        nextSlug={tutorial.nextSlug}
      />
    </div>
  );
}

