"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

function getErrorMessage(err: unknown, fallback: string) {
  if (err instanceof Error && err.message) return err.message;
  return fallback;
}

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || "Login failed");
      }
      router.push("/admin");
    } catch (err: unknown) {
      setError(getErrorMessage(err, "Login failed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container-max py-16">
      <div className="mx-auto max-w-md rounded-2xl border border-sage/60 bg-white p-6 shadow-soft">
        <h1 className="text-3xl font-semibold" style={{ fontFamily: "var(--font-playfair)" }}>
          Admin Login
        </h1>
        <p className="mt-2 text-sm text-charcoal/70">
          Sign in to view appointments and update case notes.
        </p>
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="text-sm text-charcoal/70">Username</label>
            <input
              type="text"
              className="mt-1 w-full rounded-xl border border-sage/60 bg-white px-4 py-2 outline-none focus:border-forest"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              required
            />
          </div>
          <div>
            <label className="text-sm text-charcoal/70">Password</label>
            <input
              type="password"
              className="mt-1 w-full rounded-xl border border-sage/60 bg-white px-4 py-2 outline-none focus:border-forest"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </div>
          {error && <p className="text-sm text-rose-600">{error}</p>}
          <button type="submit" className="btn-primary w-full" disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </main>
  );
}
