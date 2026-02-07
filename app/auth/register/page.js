"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/app/lib/supabaseClient";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegister(e) {
    e.preventDefault();

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (!error) {
      router.push("/auth/login");
    }
  }

  return (
    <div className="flex flex-col items-center px-4 pt-12">
      <form
        onSubmit={handleRegister}
        className="flex flex-col gap-4 w-full max-w-sm bg-white p-6 rounded-xl shadow-md"
      >
        <h1 className="text-2xl font-bold text-center text-red-600">Sign up</h1>

        <input
          type="email"
          placeholder="Email"
          className="border p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="bg-red-600 text-white py-2 rounded hover:bg-red-700">
          Sign up
        </button>

        <p className="text-center text-sm">
          Already have an account?{" "}
          <Link href="/auth/login" className="underline">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
}
