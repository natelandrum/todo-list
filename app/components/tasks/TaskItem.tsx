"use client";

import { LocalSubtask, LocalTask } from "@/lib/definitions";
import { useState } from "react";
import clsx from "clsx";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";


interface TaskItemProps {
  task: LocalTask;
  mode: string;
  setMessage: (message: string | null | undefined) => void;
  setMode: (mode: "view" | "edit" | "editing" | "create") => void;
  setEditing: (id: string) => void;
  setLocalTasks: (updateFn: (prev: LocalTask[]) => LocalTask[]) => void;
}

export default function TaskItem({
  setLocalTasks,
  setMessage,
  setMode,
  setEditing,
  task,
  mode,
}: TaskItemProps) {
  const [completed, setCompleted] = useState<boolean>(!!task.completedAt);
  const [localSubtasks, setLocalSubtasks] = useState<LocalSubtask[]>(
    task.subtasks
  );
  const [expanded, setExpanded] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  const formatDate = (date: Date) => {
    const isoDate = date.toISOString().split("T")[0];
    const [year, month, day] = isoDate.split("-");
    return `${month}/${day}/${year}`;
  }
  
  const toggleTaskCompletion = async (id: string) => {
    setCompleted((prev) => !prev);
    try {
      const response = await axios.post("/api/toggle-task-completion", JSON.stringify({
        id: id,
        completed: !completed,
      }), {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 500) {
        setCompleted((prev) => !prev);
        setMessage("Error toggling task completion");
      }
    } catch (error) {
      console.error("Error toggling task completion:", error);
      setCompleted((prev) => !prev);
      setMessage("Error toggling task completion");
    }
  };
  const toggleSubtaskCompletion = async (index: number) => {
    const updatedSubtasks = [...localSubtasks];
    updatedSubtasks[index].completed = !updatedSubtasks[index].completed;
    setLocalSubtasks(updatedSubtasks);
    try {
      const response = await axios.post("/api/toggle-subtask-completion", JSON.stringify({
        subtaskId: updatedSubtasks[index].id,
        completed: updatedSubtasks[index].completed,
      }));
      if (response.status === 500) {
        const updatedSubtasks = [...localSubtasks];
        updatedSubtasks[index].completed = !updatedSubtasks[index].completed;
        setLocalSubtasks(updatedSubtasks);
        setMessage("Error toggling subtask completion");
      }
    } catch (error) {
      console.error("Error toggling subtask completion:", error);
      const updatedSubtasks = [...localSubtasks];
      updatedSubtasks[index].completed = !updatedSubtasks[index].completed;
      setLocalSubtasks(updatedSubtasks);
      setMessage("Error toggling subtask completion");
    }
  };

  const handleExpand = () => {
    setExpanded((prev) => !prev);
  };

  async function handleDeleteTask(id: string) {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        setLoading(true);
        const response = await axios.post(
          "/api/delete",
          { id: id },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 200) {
          setLocalTasks((prev) => prev.filter((task) => task.id !== id));
          setMessage("Task deleted successfully");
        }
      } catch (error) {
        console.error(error);
        setMessage("Error deleting task");
      }
      finally {
        setLoading(false);
      }
    } else {
      return;
    }
  }

  function handleEditTask(id: string) {
    setMode("editing");
    setEditing(id);
  }

  return (
    <div
      className={clsx(
        "bg-gray-900 m-6 p-6 cursor-pointer rounded-lg shadow-lg border border-gray-700 text-white transform transition-all hover:shadow-neon"
      )}
      onClick={handleExpand}
    >
      {loading && (
        <div className="flex justify-center items-center absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2">
          <CircularProgress />
        </div>
      )}

      {/* Title */}
      <div
        className={clsx("flex items-center justify-between", {
          "mt-6": mode === "edit",
        })}
      >
        <div className="flex items-center">
          {/* Task Completion */}
          <label htmlFor={task.id} className="sr-only">
            {task.title} completion check box
          </label>
          <input
            type="checkbox"
            id={task.id}
            checked={completed}
            onChange={() => task.id && toggleTaskCompletion(task.id)}
            onClick={(e) => e.stopPropagation()}
            className="w-5 h-5 neon-checkbox"
          />
          <h2 className="text-2xl ml-4 font-bold">{task.title}</h2>
        </div>
        <div className="flex items-center">
          {mode === "edit" && (
            <div className="absolute right-3 top-0 flex items-center space-x-2">
              <IconButton
                color="primary"
                aria-label="edit task"
                onClick={(e) => {
                  e.stopPropagation();
                  if (task.id) {
                    handleEditTask(task.id);
                  }
                }}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                color="error"
                aria-label="delete task"
                onClick={(e) => {
                  e.stopPropagation();
                  if (task.id) {
                    handleDeleteTask(task.id);
                  }
                }}
              >
                <DeleteIcon />
              </IconButton>
            </div>
          )}
          {/* Priority */}
          {task.dueDate
            ? new Date(task.dueDate).toISOString().split("T")[0] <
                new Date().toISOString().split("T")[0] &&
              !completed && (
                <WarningAmberRoundedIcon
                  color="warning"
                  fontSize="large"
                  sx={{ marginRight: "1rem" }}
                />
              )
            : null}

          <span
            className={clsx(
              "md:mt-0 px-3 py-1 text-sm font-semibold uppercase border rounded",
              {
                "text-red-400 border-red-400": task.priority === "high",
                "text-yellow-400 border-yellow-400": task.priority === "medium",
                "text-green-400 border-green-400": task.priority === "low",
              }
            )}
          >
            {task.priority}
          </span>
        </div>
      </div>
      <div className="border-l-4 m-2 border-cyan-400">
        <div
          className={clsx(
            "transition-all duration-[2s] ease-in-out overflow-hidden",
            expanded ? "max-h-[1000px]" : "max-h-0"
          )}
        >
          {/* Description */}
          <p className="mt-4 ml-7 text-gray-400">{task.description}</p>

          {/* Subtasks */}
          <div className="mt-6 ml-7">
            {localSubtasks.length > 0 ? (
              <ul className="mt-2 space-y-2">
                {localSubtasks.map((subtask, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={subtask.completed}
                      onChange={() => toggleSubtaskCompletion(index)}
                      onClick={(e) => e.stopPropagation()}
                      className="w-4 h-4 neon-checkbox"
                    />
                    <span
                      className={clsx("text-gray-300 transition-colors", {
                        "line-through text-gray-500": subtask.completed,
                      })}
                    >
                      {subtask.title}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 mt-1 text-sm">
                No subtasks available
              </p>
            )}
          </div>

          {/* Tags */}
          <div className="mt-6 ml-7 flex flex-wrap gap-2">
            {task.tags.length > 0 ? (
              task.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 text-xs font-semibold text-purple-300 bg-purple-800 rounded"
                >
                  #{tag.name}
                </span>
              ))
            ) : (
              <span className="text-gray-500 text-xs">No tags</span>
            )}
          </div>

          {/* Recurring Information */}
          {task.recurring && (
            <div className="mt-6 ml-7 p-4 border border-cyan-400 rounded">
              <h4 className="text-sm font-semibold text-cyan-300">
                Recurring Task
              </h4>
              <p className="text-xs text-cyan-200">
                Repeats: Every{" "}
                {task.recurring.interval > 1 ? task.recurring.interval : ""}{" "}
                {task.recurring.repeat === "daily"
                  ? "day"
                  : task.recurring.repeat === "weekly"
                  ? "week"
                  : task.recurring.repeat === "monthly"
                  ? "month"
                  : "year"}
                {task.recurring.interval > 1 ? "s" : ""}
              </p>
              {task.recurring.endType !== "never" && (
                <p className="text-xs text-cyan-200">
                  Ends:{" "}
                  {task.recurring.endType === "date"
                    ? task.recurring.endDate &&
                      new Date(task.recurring.endDate).toLocaleDateString()
                    : `${task.recurring.endOccurrences} occurrences`}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Due Date and Timestamps */}
        <div className="mt-6 flex items-center justify-between text-gray-400 text-xs">
          <p className="ml-7 text-xl">
            <span className="font-semibold text-gray-200">Due:</span>{" "}
            <span className="text-[#ff5b5b] drop-shadow-[0_1.2px_1.2px_rgba(166,0,0,0.8)]">
              {task.dueDate
                ? formatDate(new Date(task.dueDate))
                : "No due date"}
            </span>
          </p>
          <div>
            <p>
              <span className="font-semibold text-gray-200">Created:</span>{" "}
              {formatDate(new Date(task.createdAt))}
            </p>
            <p>
              <span className="font-semibold text-gray-200">Updated:</span>{" "}
              {formatDate(new Date(task.updatedAt))}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
