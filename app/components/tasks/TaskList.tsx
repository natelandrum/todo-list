"use client";

import { useState } from "react";
import { PrismaTask } from "@/lib/definitions";
import TaskItem from "@/components/tasks/TaskItem";
import SearchFilter from "@/components/search_filter/SearchFilter";

export default function TaskList({ tasks }: { tasks: PrismaTask[] }) {
  const [filteredTasks, setFilteredTasks] = useState(tasks);

  return (
    <div>
      <SearchFilter listOfTasks={tasks} setFilteredTasks={setFilteredTasks} />
      {filteredTasks.map((task) => (
        <div key={task.id}>
          <TaskItem task={task} />
        </div>
      ))}
    </div>
  );
}