import { prisma } from "@/prisma";

async function main() {
    // Fetch the user from the database
    const user = await prisma.user.findUnique({
        where: { email: "nate178dawg@gmail.com" },
    });

    if (!user) {
        console.error("User not found. Make sure the user exists in the database.");
        return;
    }

    // Seed Tasks
    const task1 = await prisma.task.create({
        data: {
            title: "Finish project",
            description: "Complete the final project submission",
            priority: "high",
            dueDate: new Date("2025-02-20T12:00:00Z"),
            userId: user.id, // Assign to the user
        },
    });

    const task2 = await prisma.task.create({
        data: {
            title: "Grocery shopping",
            description: "Buy groceries for the week",
            priority: "medium",
            dueDate: new Date("2025-02-18T18:00:00Z"),
            userId: user.id, // Assign to the user
        },
    });

    // Seed Tags
    const tag1 = await prisma.tag.create({ data: { name: "Work" } });
    const tag2 = await prisma.tag.create({ data: { name: "Personal" } });

    // Assign Tags to Tasks
    await prisma.task.update({
        where: { id: task1.id },
        data: { tags: { connect: [{ id: tag1.id }] } },
    });

    await prisma.task.update({
        where: { id: task2.id },
        data: { tags: { connect: [{ id: tag2.id }] } },
    });

    // Seed Subtasks
    await prisma.subtask.createMany({
        data: [
            { title: "Write report", completed: false, taskId: task1.id },
            { title: "Submit to professor", completed: false, taskId: task1.id },
            { title: "Buy milk", completed: true, taskId: task2.id },
            { title: "Get vegetables", completed: false, taskId: task2.id },
        ],
    });

    console.log("✅ Database has been seeded!");
}

main()
    .catch((e) => console.error(e))
    .finally(() => prisma.$disconnect());
