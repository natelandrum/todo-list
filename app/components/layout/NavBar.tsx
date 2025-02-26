import Link from "next/link";
import SignInButton from "@/components/auth/SignInButton";
import SignOutButton from "@/components/auth/SignOutButton";
import { auth } from "@/auth";
import Image from "next/image";

export default async function NavBar() {
    const session = await auth();
    return (
      <div className="flex justify-between items-center p-4 bg-gray-800 text-white">
        <Link href="/">
          <div className="flex items-center text-2xl">
            <Image
              src="/logo.png"
              alt="Todo List logo"
              width={80}
              height={80}
              priority
            />
            <p>ToDo List</p>
          </div>
        </Link>
        {session ? <SignOutButton /> : <SignInButton />}
      </div>
    );
}