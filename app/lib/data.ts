import { prisma } from "@/prisma";
import { PrismaTask } from "./definitions";

export async function getUserId(email: string): Promise<string | undefined> {
    const user = await prisma.user.findUnique({
        where: { email },
    })
    return user?.id;
}

export async function getTasks(email: string): Promise<PrismaTask[]> {
    const userId = await getUserId(email);
    if (!userId) return [];

    return await prisma.task.findMany({
        where: { userId },
        include: {
            subtasks: true,
            tags: true,
            recurring: true,
        },
        orderBy: {
            dueDate: "asc", // Sort tasks by due date (optional)
        }
    });
}

