"use client";

import { useState, useEffect } from "react";
import { PrismaTask } from "@/lib/definitions";
import SearchBar from "./SearchBar";
import SortOptions from "./SortOptions";
import FilterOptions from "./FilterOptions";

type SearchFilterProps = {
  listOfTasks: PrismaTask[];
  setFilteredTasks: (tasks: PrismaTask[]) => void;
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
        task.title.toLowerCase().includes(searchTerm.toLowerCase())
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
              new Date(task.dueDate).toDateString() ===
                new Date().toDateString()
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
    <div className="m-6 flex flex-col md:flex-row text-black justify-around md:justify-between">
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className="flex md-justify-end space-x-4 md:ml-4">
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
