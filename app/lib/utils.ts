import { PrismaTask, LocalTask } from "./definitions";

export function convertPrismaToLocal(task: PrismaTask): LocalTask {
    return {
        id: task.id,
        title: task.title,
        description: task.description,
        priority: task.priority,
        dueDate: task.dueDate,
        completedAt: task.completedAt,
        createdAt: task.createdAt,
        updatedAt: task.updatedAt,
        subtasks: task.subtasks.map(subtask => ({
            id: subtask.id,
            title: subtask.title,
            completed: subtask.completed,
        })),
        tags: task.tags.map(tag => ({
            id: tag.id,
            name: tag.name,
        })),
    };
}