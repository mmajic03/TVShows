"use client";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  function handleClick() {
    router.back();
  }

  return (
    <button
      onClick={handleClick}
      className="bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-md shadow-sm"
    >
      Back
    </button>
  );
}
