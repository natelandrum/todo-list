import { auth } from "@/auth";
import { redirect } from "next/navigation";
import TaskList from "@/components/tasks/TaskList";
import { getTasks } from "@/lib/data";
import { PrismaTask } from "@/lib/definitions";

export default async function Home() {  
  const session = await auth();
  if (!session) redirect("/signin");
  const tasks: PrismaTask[] = await getTasks(session?.user?.email!);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold">Tasks</h1>
      <TaskList tasks={tasks} />
    </div>
  );
}
