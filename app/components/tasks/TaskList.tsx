import { PrismaTask } from "@/lib/definitions"
import TaskItem from "@/components/tasks/TaskItem";



export default function TaskList({tasks}: {tasks: PrismaTask[]}) {
    return (
        <div>
            {tasks.map((task) => (
                <div key={task.id}>
                    <TaskItem task={task} />
                </div>
            ))}
        </div>
    )
}