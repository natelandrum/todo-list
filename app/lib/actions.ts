import { prisma } from "@/prisma";
import { LocalTask, PrismaTask } from "./definitions";

export async function addTask(task: PrismaTask, userId: string): Promise<PrismaTask> {
    if (!userId) {
        throw new Error(`User not found`);
    }
    return await prisma.task.create({
        data: {
            ...task,
            userId: userId,
            subtasks: task.subtasks ? { create: task.subtasks } : undefined,
            tags: task.tags ? { create: task.tags} : undefined,
            recurring: task.recurring ? { create: task.recurring } : undefined,
        },
        include: {
            subtasks: true,
            tags: true,
            recurring: true,
        },
    });
}

export async function deleteTask(id: string): Promise<void> {
    await prisma.task.delete({
        where: {
            id
        },
    });
}

export async function updateTask(task: LocalTask): Promise<PrismaTask> {
    const existingTags = await prisma.tag.findMany({
        where: { name: { in: task.tags?.map(tag => tag.name) || [] } },
        select: { id: true, name: true },
    });

    const existingTagMap = new Map(existingTags.map(tag => [tag.name, tag.id]));

    const tagsToConnect = existingTags.map(tag => ({ id: tag.id }));
    const tagsToCreate = task.tags
        ?.filter(tag => !existingTagMap.has(tag.name))
        .map(tag => ({ name: tag.name })) || [];

    return await prisma.task.update({
        where: { id: task.id },
        data: {
            ...task,

            subtasks: task.subtasks
                ? {
                    deleteMany: {},
                    create: task.subtasks,
                }
                : undefined,

            tags: {
                connect: tagsToConnect,
                create: tagsToCreate,
            },

            recurring: task.recurring
                ? {
                    upsert: {
                        create: task.recurring,
                        update: task.recurring,
                    },
                }
                : undefined,
        },
        include: {
            subtasks: true,
            tags: true,
            recurring: true,
        },
    });
}

export async function toggleTaskCompletion(id: string, completed: boolean): Promise<void> {
    await prisma.task.update({
        where: { id },
        data: { completedAt: completed ? new Date() : null },
    });
}

export async function toggleSubtaskCompletion(id: string, completed: boolean): Promise<void> {
    await prisma.subtask.update({
        where: { id },
        data: { completed },
    });
}