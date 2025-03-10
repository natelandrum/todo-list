import { LocalTask } from "@/lib/definitions";
import { useState } from "react";

export default function DueDate({
    localTask,
    handleInputChange,
}: {
    localTask: LocalTask;
    handleInputChange: (field: keyof LocalTask, value: LocalTask[keyof LocalTask]) => void;
}) {
    const [selectedDate, setSelectedDate] = useState<Date | null>(
        localTask.dueDate ? new Date(localTask.dueDate) : null
    );

    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
        handleInputChange("dueDate", date);
    };

    return (
      <div className="flex flex-col mt-6 justify-center">
        <h3 className="text-md font-semibold text-blue-400">Due Date</h3>
        <label htmlFor="endDate" className="sr-only">
          Due Date:
        </label>
        <input
          type="date"
          id="dueDate"
          value={
            selectedDate
              ? selectedDate.toISOString().split("T")[0]
              : ""
          }
          onChange={(e) => handleDateChange(new Date(e.target.value))}
          className="bg-transparent w-fit mt-3 text-sm font-semibold text-white border border-gray-600 px-2 py-1 rounded"
          style={{ colorScheme: "dark" }}
        />
      </div>
    );
}