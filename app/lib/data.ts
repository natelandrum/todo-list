import { prisma } from "@/prisma";
import { PrismaTask } from "./definitions";


export async function getTasks(userId: string): Promise<PrismaTask[]> {
    if (!userId) return [];

    return await prisma.task.findMany({
        where: { userId },
        include: {
            subtasks: true,
            tags: true,
        },
        orderBy: {
            dueDate: "asc", // Sort tasks by due date (optional)
        }
    });
}

