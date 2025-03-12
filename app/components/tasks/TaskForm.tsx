"use client";

import { useState, useActionState, useEffect } from "react";
import clsx from "clsx";
import { validateTask } from "@/lib/validations";
import TaskDetails from "./TaskDetails";
import Subtasks from "./Subtasks";
import Tags from "./Tags";
import DueDate from "./DueDate";
import { Button } from "@mui/material";
import axios, { AxiosResponse } from "axios";
import { LocalTask } from "@/lib/definitions";
import { convertPrismaToLocal } from "@/lib/utils";
import CircularProgress from "@mui/material/CircularProgress";

interface TaskFormProps {
  mode: "view" | "edit" | "editing" | "create";
  setMode: (mode: "view" | "edit" | "editing" | "create") => void;
  setEditing: (id: string) => void;
  setLocalTasks: (updateFn: (prev: LocalTask[]) => LocalTask[]) => void;
  setMessage: (message: string | null | undefined) => void;
  task?: LocalTask;
  userId?: string;
}

const initialTaskState: LocalTask = {
  id: "",
  title: "",
  description: "",
  priority: "medium",
  dueDate: null,
  createdAt: new Date(),
  updatedAt: new Date(),
  completedAt: null,
  tags: [],
  subtasks: [],
};

export default function TaskForm({
  mode,
  setMode,
  setEditing,
  setLocalTasks,
  setMessage,
  task,
  userId,
}: TaskFormProps) {
  const initialState = {
    message: null,
    errors: {},
  };

  const [localTask, setLocalTask] = useState(task || initialTaskState);
  const [localSubtasks, setLocalSubtasks] = useState(task?.subtasks || []);
  const [localTags, setLocalTags] = useState(task?.tags || []);

  const [loading, setLoading] = useState(false);

  const [state, dispatch] = useActionState(validateTask, initialState);

  useEffect(() => {
    const createTask = async () => {
      try {
        return await axios.post(
          "/api/create",
          JSON.stringify({ localTask, userId }),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      } catch (error) {
        console.error("Error creating task:", error);
      }
    };
    const updateTask = async () => {
      try {
        return await axios.post("/api/update", JSON.stringify({ localTask }), {
          headers: {
            "Content-Type": "application/json",
          },
        });
      } catch (error) {
        console.error("Error updating task:", error);
      }
    };

    const handleTask = async () => {
      if (state.message === "success") {
        localTask.subtasks = localSubtasks;
        localTask.tags = localTags;

        let response: AxiosResponse | undefined;
        try {
          setLoading(true);
          if (mode === "create") {
            localTask.id = undefined;
            localTask.subtasks.map(subtask => subtask.id = undefined)
            localTask.tags.map(tag => tag.id = undefined)
            response = await createTask();
          } else if (mode === "editing") {
            localTask.subtasks.map(subtask => subtask.id = undefined)
            response = await updateTask();
          }

          if (response?.status === 200) {
            setLocalTask(initialTaskState);
            setLocalSubtasks([]);
            setLocalTags([]);
            if (mode === "editing") {
              setLocalTasks((prev) =>
                prev.map((t) =>
                  t.id === localTask.id
                    ? convertPrismaToLocal(response?.data.task)
                    : t
                )
              );
              setEditing("");
            } else {
              setLocalTasks((prev) => [
                ...prev,
                convertPrismaToLocal(response?.data.task),
              ]);
            }
            setMode("view");
            state.message =
              mode === "create"
                ? "Task Created Successfully"
                : "Task Updated Successfully";
            setMessage(state.message);
          } else {
            state.message =
              mode === "create" ? "Error Creating Task" : "Error Updating Task";
            setMessage(state.message);
          }
        } catch (error) {
          state.message =
            mode === "create" ? "Error Creating Task" : "Error Updating Task";
          setMessage(state.message);
          console.error("Task handling error:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    handleTask();
  }, [state.message, localSubtasks, localTags, localTask, mode, setEditing, setLocalTasks, setMessage, setMode, state, userId]);

  const toggleSubtaskCompletion = (index: number) => {
    const updatedSubtasks = [...localSubtasks];
    updatedSubtasks[index].completed = !updatedSubtasks[index].completed;
    setLocalSubtasks(updatedSubtasks);
  };

  const handleInputChange = (field: keyof LocalTask, value: LocalTask[keyof LocalTask]) => {
    setLocalTask({ ...localTask, [field]: value });
  };

  return (
    <div
      className={clsx(
        "bg-gray-900 m-6 p-6 rounded-lg shadow-lg border border-gray-700 text-white transform transition-all hover:shadow-neon"
      )}
    >
      {loading && (
        <div className="flex justify-center items-center absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2">
          <CircularProgress />
        </div>
      )}
      <form action={dispatch}>
        <TaskDetails
          localTask={localTask}
          handleInputChange={handleInputChange}
        />
        <Subtasks
          localSubtasks={localSubtasks}
          setLocalSubtasks={setLocalSubtasks}
          toggleSubtaskCompletion={toggleSubtaskCompletion}
        />
        <Tags localTags={localTags} setLocalTags={setLocalTags} />
        <DueDate localTask={localTask} handleInputChange={handleInputChange} />
        <Button
          type="submit"
          variant="contained"
          sx={{ marginTop: "1rem" }}
          loading={loading}
        >
          {mode === "create" ? "Add Task" : "Update Task"}
        </Button>
        <Button
          type="button"
          color="error"
          variant="contained"
          sx={{ marginTop: "1rem", marginLeft: "1rem" }}
          onClick={() => {
            setMode("view");
            setEditing("");
          }}
          loading={loading}
        >
          Cancel
        </Button>
      </form>
      {state.errors && (
        <div role="alert" aria-live="polite" className="mt-4 text-red-500">
          {Object.values(state.errors).map((error, index) => (
            <p key={index}>{error}</p>
          ))}
        </div>
      )}
    </div>
  );
}
