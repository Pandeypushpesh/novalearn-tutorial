"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface AuthFormProps {
  mode: "login" | "register";
}

export default function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setMessage(null);

    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    const res = await fetch(`/api/auth/${mode}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      if (typeof window !== "undefined" && mode === "login") {
        sessionStorage.setItem("novalearn-thankyou", "1");
      }
      router.push("/dashboard");
      router.refresh();
    } else {
      const data = await res.json();
      setMessage(data.message ?? "Something went wrong");
    }

    setLoading(false);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 shadow-xl shadow-slate-900/5"
    >
      <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">
        {mode === "login" ? "Welcome back" : "Create your account"}
      </h1>
      {message && <p className="text-sm text-rose-500">{message}</p>}
      {mode === "register" && (
        <div className="space-y-1">
          <label className="text-sm text-slate-500">Name</label>
          <input
            required
            name="name"
            className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent px-3 py-2"
          />
        </div>
      )}
      <div className="space-y-1">
        <label className="text-sm text-slate-500">Email</label>
        <input
          type="email"
          required
          name="email"
          className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent px-3 py-2"
        />
      </div>
      <div className="space-y-1">
        <label className="text-sm text-slate-500">Password</label>
        <input
          type="password"
          required
          name="password"
          className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent px-3 py-2"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-brand px-4 py-2 text-white font-semibold hover:bg-brand-dark disabled:opacity-50"
      >
        {loading ? "Please wait..." : mode === "login" ? "Login" : "Create account"}
      </button>
      <p className="text-sm text-center text-slate-500">
        {mode === "login" ? (
          <>
            Need an account?{" "}
            <Link href="/register" className="text-brand underline">
              Register
            </Link>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <Link href="/login" className="text-brand underline">
              Login
            </Link>
          </>
        )}
      </p>
    </form>
  );
}

