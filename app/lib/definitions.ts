import { Task, Subtask, Tag, RecurringTask } from '@prisma/client';

export type PrismaTask = Task & {
  subtasks: Subtask[];
  tags: Tag[];
  recurring: RecurringTask | null;
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
  recurring: LocalRecurring | null;
}

export type LocalRecurring = {
  repeat: string;
  interval: number;
  endType: string;
  endDate: Date | null;
  endOccurrences: number | null;
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