import { Task, Subtask, Tag, RecurringTask } from '@prisma/client';

export type PrismaTask = Task & {
  subtasks: Subtask[];
  tags: Tag[];
  recurring: RecurringTask | null;
}
