import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { IconButton } from "@mui/material";
import clsx from "clsx";
import { LocalSubtask } from "@/lib/definitions";

export default function Subtasks({
  localSubtasks,
  setLocalSubtasks,
  toggleSubtaskCompletion,
}: {
  localSubtasks: LocalSubtask[];
  setLocalSubtasks: React.Dispatch<
    React.SetStateAction<LocalSubtask[]>
  >;
  toggleSubtaskCompletion: (index: number) => void;
}) {
  return (
    <div className="mt-6">
      <div className="flex items-center">
        <h3 className="text-md font-semibold text-blue-400">Subtasks</h3>
        <IconButton
          type="button"
          color="primary"
          aria-label="add subtask"
          onClick={() =>
            setLocalSubtasks([
              ...localSubtasks,
              {
                id: Math.random().toString(),
                title: "",
                completed: false,
              },
            ])
          }
          className="mt-2 px-2 py-1 bg-blue-600 text-white rounded"
        >
          <AddIcon />
        </IconButton>
      </div>

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
              <input
                type="text"
                value={subtask.title}
                onChange={(e) => {
                  const updatedSubtasks = [...localSubtasks];
                  updatedSubtasks[index].title = e.target.value;
                  setLocalSubtasks(updatedSubtasks);
                }}
                className={clsx(
                  "bg-transparent border-b border-gray-600 text-white w-full focus:outline-none",
                  {
                    "line-through text-gray-500": subtask.completed,
                  }
                )}
              />
              <IconButton
                type="button"
                color="error"
                aria-label="remove subtask"
                onClick={() => {
                  const updatedSubtasks = [...localSubtasks];
                  updatedSubtasks.splice(index, 1);
                  setLocalSubtasks(updatedSubtasks);
                }}
                className="px-2 py-1 bg-red-600 text-white rounded"
              >
                <RemoveIcon />
              </IconButton>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 mt-1 text-sm">No subtasks</p>
      )}
    </div>
  );
}
