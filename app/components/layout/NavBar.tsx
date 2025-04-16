import Link from "next/link";
import SignOutButton from "@/components/auth/SignOutButton";
import Image from "next/image";
import getSession from "@/lib/getSession";

export default async function NavBar() {
    const session = await getSession();
    return (
      <div className="flex flex-wrap justify-between items-center p-2 sm:p-4 bg-gray-800 text-white">
        <Link href="/">
          <div className="flex items-center">
            <Image
              src="/logo.png"
              alt="Todo List logo"
              width={60}
              height={60}
              className="w-12 h-12 sm:w-16 sm:h-16"
              priority
            />
            <p className="text-xl sm:text-2xl ml-2">ToDo List</p>
          </div>
        </Link>
        {session ? <SignOutButton /> : null}
      </div>
    );
}