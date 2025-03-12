"use server";

import { z } from "zod";

const TaskSchema = z.object({
    title: z.string().min(3, { message: "Title must be at least 3 characters long" }).max(255, { message: "Title must be at most 255 characters long" }),
    description: z.string().min(3, { message: "Description must be at least 3 characters long" }).max(500, { message: "Description must be at most 500 characters long" }).optional(),
    priority: z.enum(["low", "medium", "high"], { message: "Priority must be one of 'low', 'medium', or 'high'" }),
    dueDate: z.date().optional(),
    tags: z.array(z.string(), { message: "Tags must be an array of strings" }),
    subtasks: z.array(
        z.object({
            title: z.string().min(3, { message: "Subtask title must be at least 3 characters long" }).max(255, { message: "Subtask title must be at most 255 characters long" }),
        })
    ),
});

export type TaskState = {
    errors?: {
        title?: string[];
        description?: string[];
        status?: string[];
        priority?: string[];
        dueDate?: string[];
        createdAt?: string[];
        updatedAt?: string[];
        completedAt?: string[];
        userId?: string[];
        tags?: string[];
        subtasks?: string[];
    };
    message?: string | null;
}

export async function validateTask(prevState: TaskState, formData: FormData): Promise<TaskState> {
    const validatedFields = TaskSchema.safeParse({
        title: formData.get("title") as string || "",
        description: formData.get("description") as string || undefined,
        priority: formData.get("priority") as string || "",
        dueDate: formData.get("dueDate") as string || undefined,
        tags: formData.getAll("tags") || [],
        subtasks: JSON.parse(formData.get("subtasks") as string) || [],
    })

    if (!validatedFields.success) {
        return {
            ...prevState,
            errors: validatedFields.error.flatten().fieldErrors,
            message: null,
        }
    }
    return {
        ...prevState, errors: {}, message: "success"
    }
}