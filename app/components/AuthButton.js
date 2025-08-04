"use client";
import { useSession, signIn, signOut } from "next-auth/react";

export default function AuthButton() {
  const { data: session } = useSession();

  if (session?.user?.email) {
    return <button onClick={() => signOut()}>SIGN OUT</button>
  }
    return <button onClick={() => signIn()}>SIGN IN</button>
}
