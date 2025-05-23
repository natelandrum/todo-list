import { LocalTask } from "@/lib/definitions";

export default function TaskDetails({
  localTask,
  handleInputChange,
}: {
  localTask: LocalTask;
  handleInputChange: (field: keyof LocalTask, value: LocalTask[keyof LocalTask]) => void;
}) {
  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Task Title"
          value={localTask.title}
          onChange={(e) => handleInputChange("title", e.target.value)}
          className="text-xl sm:text-2xl font-semibold bg-transparent border-b border-gray-600 text-white w-full focus:outline-none focus:border-blue-400 px-2 py-1"
        />
        <select
          name="priority"
          id="priority"
          value={localTask.priority}
          onChange={(e) => handleInputChange("priority", e.target.value)}
          className="mt-2 sm:mt-0 sm:ml-4 bg-transparent text-sm font-semibold text-white border border-gray-600 px-2 py-1 rounded w-full sm:w-auto"
        >
          <option value="" disabled>
            Priority
          </option>
          <option value="low" className="text-black">
            Low
          </option>
          <option value="medium" className="text-black">
            Medium
          </option>
          <option value="high" className="text-black">
            High
          </option>
        </select>
      </div>
      <div>
        <textarea
          name="description"
          id="description"
          placeholder="Task Description"
          value={localTask.description ? localTask.description : ""}
          onChange={(e) => handleInputChange("description", e.target.value)}
          className="mt-4 px-2 py-1 bg-transparent border border-gray-600 text-white w-full h-24 focus:outline-none focus:border-blue-400 rounded-md"
        />
      </div>
    </>
  );
}
