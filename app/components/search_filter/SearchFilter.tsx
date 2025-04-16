"use client";

import { useState, useEffect } from "react";
import { LocalTask } from "@/lib/definitions";
import SearchBar from "./SearchBar";
import SortOptions from "./SortOptions";
import FilterOptions from "./FilterOptions";

type SearchFilterProps = {
  listOfTasks: LocalTask[];
  setFilteredTasks: (tasks: LocalTask[]) => void;
};

export default function SearchFilter({
  listOfTasks,
  setFilteredTasks,
}: SearchFilterProps) {
  const [selectedOption, setSelectedOption] = useState("Sort Order");
  const [sortOrder, setSortOrder] = useState("Ascending");
  const [selectedFilter, setSelectedFilter] = useState("Filter");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    let filtered = [...listOfTasks];

    if (searchTerm) {
      filtered = filtered.filter((task) =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.subtasks.some((subtask) =>
          subtask.title.toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        task.tags.some((tag) =>
          tag.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    if (selectedFilter !== "Filter") {
      switch (selectedFilter) {
        case "High Priority":
          filtered = filtered.filter((task) => task.priority === "high");
          break;
        case "Medium Priority":
          filtered = filtered.filter((task) => task.priority === "medium");
          break;
        case "Low Priority":
          filtered = filtered.filter((task) => task.priority === "low");
          break;
        case "Due Today":
          filtered = filtered.filter(
            (task) =>
              task.dueDate &&
              new Date(task.dueDate).toISOString().split("T")[0] ===
                new Date().toISOString().split("T")[0]
          );
          break;
        case "Due Tomorrow":
          filtered = filtered.filter(
            (task) =>
              task.dueDate &&
              new Date(task.dueDate).toISOString().split("T")[0] ===
                new Date(new Date().setDate(new Date().getDate() + 1))
                  .toISOString()
                  .split("T")[0]
          );
          break;
        case "Due Within a Week":
          filtered = filtered.filter(
            (task) =>
              task.dueDate &&
              new Date(task.dueDate).toISOString().split("T")[0] >=
                new Date().toISOString().split("T")[0] &&
              new Date(task.dueDate).toISOString().split("T")[0] <=
                new Date(new Date().setDate(new Date().getDate() + 7))
                  .toISOString()
                  .split("T")[0]
          );
          break;
          case "Past Due":
            filtered = filtered.filter(
              (task) =>
                task.dueDate &&
                new Date(task.dueDate).toISOString().split("T")[0] <
                  new Date().toISOString().split("T")[0]
            );
          break;
        default:
          break;
      }
    }

    if (selectedOption !== "Sort Order") {
      switch (selectedOption) {
        case "Priority":
          const priorityRank: Record<"high" | "medium" | "low", number> = {
            high: 1,
            medium: 2,
            low: 3,
          };
          filtered = filtered.sort(
            (a, b) =>
              priorityRank[a.priority as keyof typeof priorityRank] -
              priorityRank[b.priority as keyof typeof priorityRank]
          );
          break;
        case "Due Date":
          filtered = filtered.sort(
            (a, b) =>
              new Date(a.dueDate || "").getTime() -
              new Date(b.dueDate || "").getTime()
          );
          break;
        default:
          break;
      }
    }

    if (sortOrder === "Descending") {
      filtered = filtered.reverse();
    }

    setFilteredTasks(filtered);
  }, [
    searchTerm,
    selectedFilter,
    selectedOption,
    sortOrder,
    listOfTasks,
    setFilteredTasks,
  ]);

  return (
    <div className="m-3 sm:m-6 flex flex-col gap-4">
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <SortOptions
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
        />
        <FilterOptions
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
        />
      </div>
    </div>
  );
}
