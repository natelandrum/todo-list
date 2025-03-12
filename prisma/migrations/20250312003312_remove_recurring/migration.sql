/*
  Warnings:

  - You are about to drop the `RecurringTask` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "RecurringTask" DROP CONSTRAINT "RecurringTask_taskId_fkey";

-- DropTable
DROP TABLE "RecurringTask";
