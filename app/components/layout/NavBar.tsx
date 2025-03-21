import Link from "next/link";
import SignOutButton from "@/components/auth/SignOutButton";
import Image from "next/image";
import getSession from "@/lib/getSession";

export default async function NavBar() {
    const session = await getSession();
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
        {session ? <SignOutButton /> : null}
      </div>
    );
}