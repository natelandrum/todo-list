import { redirect } from "next/navigation";
import TaskList from "@/components/tasks/TaskList";
import { getTasks } from "@/lib/data";
import { PrismaTask } from "@/lib/definitions";
import getSession from "./lib/getSession";

export default async function Home() {  
  const session = await getSession();
  if (!session?.user?.id) return null;
  const userId = session.user.id;

  const tasks: PrismaTask[] = await getTasks(userId);

  return (
    tasks.length > 0 ? (
    <div className="container mx-auto p-4">
      <h1 className="ml-6 text-4xl font-bold">Tasks</h1>
      <TaskList tasks={tasks} userId={userId ?? ""} />
    </div>
    ) : (
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold">No tasks found</h1>
      </div>
    )
  );
}
