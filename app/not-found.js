import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center relative mt-60 bg-white">
      <h2 className="text-[30vw] absolute font-extrabold text-red-100">404</h2>
      <div className="relative text-center">
        <p className="text-6xl font-bold text-gray-800 mb-6">Oops! Page not found</p>
        <p className="text-lg text-gray-700 mb-8">Requested page doesn't exist.</p>
        <Link href="/" className="bg-red-600 hover:bg-red-700 text-white px-7 py-5 rounded-md shadow-sm">
          Go Home
        </Link>
      </div>
    </div>
  );
}
