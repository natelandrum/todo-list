"use client";

import { useEffect, useState } from "react";
import { PrismaTask, LocalTask } from "@/lib/definitions";
import TaskItem from "@/components/tasks/TaskItem";
import SearchFilter from "@/components/search_filter/SearchFilter";
import TaskForm from "./TaskForm";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import clsx from "clsx";
import { convertPrismaToLocal } from "@/lib/utils";

export default function TaskList({
  tasks,
  userId,
}: {
  tasks: PrismaTask[];
  userId: string;
}) {
  const convertedTasks = tasks.map((task) => ({
    ...convertPrismaToLocal(task),
  }));

  const [localTasks, setLocalTasks] = useState<LocalTask[]>(convertedTasks);
  const [filteredTasks, setFilteredTasks] = useState<LocalTask[]>(convertedTasks);
  const [mode, setMode] = useState<"view" | "edit" | "editing" | "create">("view");
  const [message, setMessage] = useState<string | null | undefined>(null);
  const [showing, setShowing] = useState<boolean>(false);
  const [editing, setEditing] = useState<string>("");

  const handleModeChange = (newMode: "view" | "edit" | "create") => {
    setMode(newMode);
  };

  

  useEffect(() => {
    if (message !== "null") {
      setShowing(true);
      setTimeout(() => {
        setShowing(false);
        setTimeout(() => {
          setMessage(null);
        }, 1000);
      }, 5000);
    }
  }, [message]);

  return (
    <Box>
      <SearchFilter
        listOfTasks={localTasks}
        setFilteredTasks={setFilteredTasks}
      />
      <Button
        variant="outlined"
        onClick={() => handleModeChange(mode === "view" ? "create" : "view")}
        color={mode === "create" ? "error" : "primary"}
        sx={{ marginLeft: "1.5rem" }}
        disabled={mode === "edit" || mode === "editing" || mode === "create"}
      >
        {mode === "create" ? "Cancel" : "Create Task"}
      </Button>
      <Button
        variant="outlined"
        onClick={() => handleModeChange(mode === "view" ? "edit" : "view")}
        sx={{
          marginLeft: "1.5rem",
          color: mode === "edit" ? "#FF0000" : "#ffe400",
          borderColor: mode === "edit" ? "#FF0000" : "#9b870c",
          "&:hover": {
            borderColor: mode === "edit" ? "#E57373" : "#FFF176",
          },
        }}
        disabled={mode === "create" || mode === "editing"}
      >
        {mode === "edit" ? "Cancel" : "Edit Task"}
      </Button>
      {mode === "create" && (
        <TaskForm
          mode={mode}
          setMode={setMode}
          setEditing={setEditing}
          setLocalTasks={setLocalTasks}
          setMessage={setMessage}
          userId={userId}
        />
      )}
      {filteredTasks.map((task, index) => (
      <Box key={index}>
        {task.id === editing ? (
          <TaskForm
            mode={mode}
            setMode={setMode}
            setEditing={setEditing}
            setLocalTasks={setLocalTasks}
            setMessage={setMessage}
            task={task}
            userId={userId}
          />
        ) : (
          <TaskItem
            setLocalTasks={setLocalTasks}
            setMessage={setMessage}
            setMode={setMode}
            setEditing={setEditing}
            task={task}
            mode={mode}
          />
        )}
      </Box>
      ))}
      {message && (
        <div
          id="message"
          className={clsx(
            "fixed bottom-4 right-4 z-30 bg-green-500 text-white p-4 rounded-lg shadow-lg transition-transform duration-1000 transform",
            {
              "bg-red-500": message.toLowerCase().includes("error"),
              "translate-x-0": showing,
              "translate-x-full": !showing,
            }
          )}
        >
          <p>{message.toUpperCase()}</p>
        </div>
      )}
    </Box>
  );
}
