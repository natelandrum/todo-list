"use client";

import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <button className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-md" onClick={() => signOut()}>
      Sign Out
    </button>
  );
}