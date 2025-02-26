import SignInModule from "@/components/signin/SignInModule";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function SignInPage() {
  const session = await auth();
  if (session) redirect("/");
  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <SignInModule />
    </div>
  );
}