import { Task, Subtask, Tag } from '@prisma/client';

export type PrismaTask = Task & {
  subtasks: Subtask[];
  tags: Tag[];
}

export type LocalTask = {
  id: string | undefined;
  title: string;
  description: string | null;
  priority: string;
  dueDate: Date | null;
  completedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  subtasks: LocalSubtask[];
  tags: LocalTag[];
}
export type LocalSubtask = {
    id: string | undefined;
    title: string;
    completed: boolean;
}

export type LocalTag = {
    id: string | undefined;
    name: string;
}