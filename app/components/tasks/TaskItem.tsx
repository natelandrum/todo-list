"use client";

import { PrismaTask } from "@/lib/definitions";
import { useState } from "react";
import clsx from "clsx";

export default function TaskItem({ task }: { task: PrismaTask }) {
  const [completed, setCompleted] = useState(!!task.completedAt);
  const [localSubtasks, setLocalSubtasks] = useState(task.subtasks);
  const [expanded, setExpanded] = useState(false);

  const toggleTaskCompletion = () => setCompleted((prev) => !prev);
  const toggleSubtaskCompletion = (index: number) => {
    const updatedSubtasks = [...localSubtasks];
    updatedSubtasks[index].completed = !updatedSubtasks[index].completed;
    setLocalSubtasks(updatedSubtasks);
  };

  const handleExpand = () => {
    setExpanded((prev) => !prev);
  }

  return (
    <div
      className={clsx(
        "bg-gray-900 m-6 p-6 cursor-pointer rounded-lg shadow-lg border border-gray-700 text-white transform transition-all hover:shadow-neon"
      )}
      onClick={handleExpand}
    >
      {/* Title */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{task.title}</h2>
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

      {expanded && (
        <>
          {/* Description */}
          <p className="mt-4 text-gray-400">{task.description}</p>
          {/* Task Completion */}
          <div className="mt-4">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={completed}
                onChange={toggleTaskCompletion}
                onClick={(e) => e.stopPropagation()}
                className="w-5 h-5 neon-checkbox"
              />
              <span
                className={clsx("text-lg transition-colors", {
                  "line-through text-gray-500": completed,
                  "text-white": !completed,
                })}
              >
                {completed ? "Completed" : "Not Completed"}
              </span>
            </label>
          </div>
    
          {/* Subtasks */}
          <div className="mt-6">
            <h3 className="text-md font-semibold text-blue-400">Subtasks</h3>
            {localSubtasks.length > 0 ? (
              <ul className="mt-2 space-y-2">
                {localSubtasks.map((subtask, index) => (
                  <li key={subtask.id} className="flex items-center space-x-3">
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
              <p className="text-gray-500 mt-1 text-sm">No subtasks available</p>
            )}
          </div>
    
          {/* Tags */}
          <div className="mt-6 flex flex-wrap gap-2">
            {task.tags.length > 0 ? (
              task.tags.map((tag) => (
                <span
                  key={tag.id}
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
            <div className="mt-6 p-4 border border-cyan-400 rounded">
              <h4 className="text-sm font-semibold text-cyan-300">
                Recurring Task
              </h4>
              <p className="text-xs text-cyan-200">
                Repeats: {task.recurring.repeat} every {task.recurring.interval}{" "}
                {task.recurring.repeat === "daily"
                  ? "day"
                  : task.recurring.repeat === "weekly"
                  ? "week"
                  : task.recurring.repeat === "monthly"
                  ? "month"
                  : "year"}
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
        </>
      )}



      {/* Due Date and Timestamps */}
      <div className="mt-6 flex items-center justify-between text-gray-400 text-xs">
        <p className="text-xl">
          <span className="font-semibold text-gray-200">Due:</span>{" "}
          <span className="text-[#ff5b5b] drop-shadow-[0_1.2px_1.2px_rgba(166,0,0,0.8)]">
            {task.dueDate
              ? new Date(task.dueDate).toLocaleDateString()
              : "No due date"}
          </span>
        </p>
        <div>
          <p>
            <span className="font-semibold text-gray-200">Created:</span>{" "}
            {new Date(task.createdAt).toLocaleDateString()}
          </p>
          <p>
            <span className="font-semibold text-gray-200">Updated:</span>{" "}
            {new Date(task.updatedAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}
