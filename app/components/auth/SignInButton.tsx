import Link from "next/link";

export default function SignInButton() {
  return (
    <Link href="/signin">
      <button className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-md">
        Sign In
      </button>
    </Link>
  );
}