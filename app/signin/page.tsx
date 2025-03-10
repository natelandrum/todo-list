import SignInModule from "@/components/signin/SignInModule";
import { redirect } from "next/navigation";
import getSession from "@/lib/getSession";

export default async function SignInPage() {
  const session = await getSession();
  if (session) redirect("/");
  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <SignInModule />
    </div>
  );
}