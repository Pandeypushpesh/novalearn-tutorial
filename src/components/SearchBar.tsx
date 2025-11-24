"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function SearchBar() {
  const router = useRouter();
  const params = useSearchParams();
  const [value, setValue] = useState("");

  useEffect(() => {
    setValue(params.get("q") ?? "");
  }, [params]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/tutorials?q=${encodeURIComponent(value)}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="hidden md:flex items-center gap-2 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-2"
    >
      <MagnifyingGlassIcon className="h-4 w-4 text-slate-500" />
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search tutorials"
        className="bg-transparent text-sm focus:outline-none"
      />
    </form>
  );
}

