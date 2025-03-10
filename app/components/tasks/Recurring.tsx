import { LocalRecurring } from "@/lib/definitions";

const initialLocalRecurring = ({
  repeat: "daily",
  interval: 1,
  endType: "never",
  endDate: null,
  endOccurrences: null,
});

export default function Recurring({
  localRecurring,
  setLocalRecurring,
  handleRecurringChange,
}: {
  localRecurring: LocalRecurring | null;
  setLocalRecurring: React.Dispatch<
    React.SetStateAction<LocalRecurring | null>>;
  handleRecurringChange: (
    field: keyof LocalRecurring,
    value: LocalRecurring[keyof LocalRecurring]
  ) => void;
}) {
  return (
    <div className="mt-6">
      <h3 className="text-md font-semibold text-blue-400">Recurring</h3>
      <div className="flex items-center mt-2">
        <label htmlFor="recurring" className="mr-2 text-sm">
          Is this task recurring?
        </label>
        <input
          type="checkbox"
          id="recurring"
          checked={!!localRecurring}
          onChange={(e) =>
            setLocalRecurring(e.target.checked ? initialLocalRecurring : null)
          }
          className="w-4 h-4 neon-checkbox"
        />
      </div>

      {localRecurring && (
        <div className="mt-4 space-y-4">
          <div className="flex items-center">
            <label htmlFor="repeat" className="mr-2 text-sm">
              Repeat:
            </label>
            <select
              id="repeat"
              value={localRecurring.repeat}
              onChange={(e) => handleRecurringChange("repeat", e.target.value)}
              className="bg-transparent text-sm font-semibold text-white border border-gray-600 px-2 py-1 rounded"
            >
              <option value="daily" className="text-black">
                Daily
              </option>
              <option value="weekly" className="text-black">
                Weekly
              </option>
              <option value="monthly" className="text-black">
                Monthly
              </option>
              <option value="yearly" className="text-black">
                Yearly
              </option>
            </select>
          </div>

          <div className="flex items-center">
            <label htmlFor="interval" className="mr-2 text-sm">
              Interval:
            </label>
            <input
              type="number"
              id="interval"
              value={localRecurring.interval}
              onChange={(e) =>
                handleRecurringChange("interval", parseInt(e.target.value, 10))
              }
              className="bg-transparent text-sm font-semibold text-white border border-gray-600 px-2 py-1 rounded w-16"
            />
          </div>

          <div className="flex items-center">
            <label htmlFor="endType" className="mr-2 text-sm">
              Ends:
            </label>
            <select
              id="endType"
              value={localRecurring.endType}
              onChange={(e) => handleRecurringChange("endType", e.target.value)}
              className="bg-transparent text-sm font-semibold text-white border border-gray-600 px-2 py-1 rounded"
            >
              <option value="never" className="text-black">
                Never
              </option>
              <option value="date" className="text-black">
                On Date
              </option>
              <option value="occurrences" className="text-black">
                After Occurrences
              </option>
            </select>
          </div>

          {localRecurring.endType === "date" && (
            <div className="flex items-center">
              <label htmlFor="endDate" className="mr-2 text-sm">
                End Date:
              </label>
              <input
                type="date"
                id="endDate"
                value={
                  localRecurring.endDate
                    ? new Date(localRecurring.endDate)
                        .toISOString()
                        .split("T")[0]
                    : ""
                }
                onChange={(e) =>
                  handleRecurringChange("endDate", new Date(e.target.value))
                }
                className="bg-transparent text-sm font-semibold text-white border border-gray-600 px-2 py-1 rounded"
                style={{ colorScheme: "dark" }}
              />
            </div>
          )}

          {localRecurring.endType === "occurrences" && (
            <div className="flex items-center">
              <label htmlFor="endOccurrences" className="mr-2 text-sm">
                End After:
              </label>
              <input
                type="number"
                id="endOccurrences"
                value={localRecurring.endOccurrences || ""}
                onChange={(e) =>
                  handleRecurringChange(
                    "endOccurrences",
                    parseInt(e.target.value, 10)
                  )
                }
                className="bg-transparent text-sm font-semibold text-white border border-gray-600 px-2 py-1 rounded w-16"
              />
              <span className="ml-2 text-sm">occurrences</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
