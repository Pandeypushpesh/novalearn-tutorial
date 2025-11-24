"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import useSWR from "swr";
import type { Tutorial } from "@/types/tutorial";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Sidebar() {
  const pathname = usePathname();
  const { data } = useSWR<{ tutorials: Tutorial[] }>("/api/tutorial/list", fetcher);

  const grouped = useMemo(() => {
    if (!data?.tutorials) return {};
    return data.tutorials.reduce<Record<string, Tutorial[]>>((acc, tutorial) => {
      if (!acc[tutorial.category]) {
        acc[tutorial.category] = [];
      }
      acc[tutorial.category].push(tutorial);
      return acc;
    }, {});
  }, [data]);

  return (
    <aside className="hidden lg:block lg:w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
      <div className="p-4 space-y-6">
        {Object.entries(grouped).map(([category, tutorials]) => (
          <div key={category}>
            <p className="text-xs uppercase tracking-wide text-slate-500 mb-2">{category}</p>
            <div className="space-y-1">
              {tutorials.map((tutorial) => (
                <Link
                  key={tutorial.slug}
                  href={`/tutorials/${tutorial.slug}`}
                  className={`block rounded-md px-3 py-2 text-sm transition ${
                    pathname === `/tutorials/${tutorial.slug}`
                      ? "bg-brand/10 text-brand"
                      : "hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  {tutorial.title}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}

