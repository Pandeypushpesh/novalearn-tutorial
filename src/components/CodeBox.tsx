"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { ClipboardIcon, PlayIcon } from "@heroicons/react/24/outline";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

interface CodeBoxProps {
  code: string;
  language: string;
}

export default function CodeBox({ code, language }: CodeBoxProps) {
  const [value, setValue] = useState(code);
  const [output, setOutput] = useState("");

  const copyCode = async () => {
    await navigator.clipboard.writeText(value);
  };

  const runCode = () => {
    if (language === "html" || language === "css") {
      setOutput(value);
      return;
    }

    try {
      // rudimentary sandbox using Function
      // eslint-disable-next-line no-new-func
      const result = Function(`"use strict"; ${value}`)();
      setOutput(String(result ?? "Code executed"));
    } catch (error) {
      setOutput((error as Error).message);
    }
  };

  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-950/90 text-slate-100 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 text-xs uppercase tracking-wide">
        <span>{language}</span>
        <div className="flex items-center gap-2">
          <button
            className="inline-flex items-center gap-1 rounded-full bg-slate-800 px-3 py-1 hover:bg-slate-700 transition"
            onClick={copyCode}
          >
            <ClipboardIcon className="h-3.5 w-3.5" /> Copy
          </button>
          <button
            className="inline-flex items-center gap-1 rounded-full bg-brand px-3 py-1 text-white hover:bg-brand-dark transition"
            onClick={runCode}
          >
            <PlayIcon className="h-3.5 w-3.5" /> Run
          </button>
        </div>
      </div>
      <div className="h-72 border-y border-slate-800">
        <MonacoEditor
          height="100%"
          language={language === "jsx" ? "javascript" : language}
          theme="vs-dark"
          value={value}
          onChange={(nextValue) => setValue(nextValue ?? "")}
          options={{ minimap: { enabled: false }, fontSize: 14 }}
        />
      </div>
      <div className="bg-black p-4 text-sm">
        <p className="mb-1 font-semibold text-brand">Output</p>
        {language === "html" ? (
          <iframe className="w-full h-48 rounded-lg bg-white" srcDoc={output || value} />
        ) : (
          <pre className="whitespace-pre-wrap">{output}</pre>
        )}
      </div>
    </div>
  );
}

