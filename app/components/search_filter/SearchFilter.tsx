"use client";

import { useState, useEffect } from "react";
import clsx from "clsx";
import { PrismaTask } from "@/lib/definitions";

type SearchFilterProps = {
  listOfTasks: PrismaTask[];
  setFilteredTasks: (tasks: PrismaTask[]) => void;
};

export default function SearchFilter({
  listOfTasks,
  setFilteredTasks,
}: SearchFilterProps) {
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Sort Order");
  const [sortOrder, setSortOrder] = useState("Ascending");
  const [selectedFilter, setSelectedFilter] = useState("Filter");
  const [searchTerm, setSearchTerm] = useState("");

  const toggleOptions = () => setIsOptionsOpen((prev) => !prev);
  const toggleFilter = () => setIsFilterOpen((prev) => !prev);
  const selectOption = (option: string) => {
    setSelectedOption(option);
    setIsOptionsOpen(false);
  };
  const selectFilter = (filter: string) => {
    setSelectedFilter(filter);
    setIsFilterOpen(false);
  };
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "Ascending" ? "Descending" : "Ascending");
  };

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
          filtered = filtered.filter((task) =>
            task.dueDate
              ? new Date(task.dueDate).toDateString() ===
                new Date().toDateString()
              : false
          );
          break;
        case "Due Tomorrow":
          filtered = filtered.filter((task) =>
            task.dueDate
              ? new Date(task.dueDate).toDateString() ===
                new Date(
                  new Date().setDate(new Date().getDate() + 1)
                ).toDateString()
              : false
          );
          break;
        case "Due This Week":
          // Get the start of the week
          const startOfWeek = new Date();
          startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
          startOfWeek.setHours(0, 0, 0, 0);
          // Get the end of the week
          const endOfWeek = new Date();
          endOfWeek.setDate(endOfWeek.getDate() + (6 - endOfWeek.getDay()));
          endOfWeek.setHours(23, 59, 59, 999);
          filtered = filtered.filter((task) =>
            task.dueDate
              ? new Date(task.dueDate) >= startOfWeek &&
                new Date(task.dueDate) <= endOfWeek
              : false
          );
          break;
        default:
          break;
      }
    }

    if (selectedOption !== "Sort Order") {
      // Apply sort logic here based on selectedOption and sortOrder
      // Example: filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
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
          filtered = filtered.sort((a, b) => {
            if (a.dueDate && b.dueDate) {
              return (
                new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
              );
            }
            return 0;
          });
          break;
        case "Created Date":
          filtered = filtered.sort(
            (a, b) =>
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
          break;
        case "Updated Date":
          filtered = filtered.sort(
            (a, b) =>
              new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
          );
          break;
        case "Name":
          filtered = filtered.sort((a, b) => a.title.localeCompare(b.title));
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
    <div>
      {/* Container */}
      <div className="m-6 flex flex-col md:flex-row text-black justify-around md:justify-between">
        {/* Search */}
        <label className="sr-only" htmlFor="search">
          Search
        </label>
        <input
          type="text"
          id="search"
          name="search"
          placeholder="Search"
          className="w-full max-w-80 p-4 h-10 rounded-3xl"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="flex flex-col md:flex-row md:justify-end">
          {/* Order By */}
          <label htmlFor="order" className="sr-only">
            Order
          </label>
          <div id="order" className="w-56 mt-4 md:mr-4 md:mt-0 h-10">
            <div className="relative w-full">
              <button
                onClick={toggleOptions}
                className="bg-white rounded-3xl w-full border cursor-pointer border-gray-300 shadow-sm pl-3 pr-10 py-2 text-left focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              >
                {selectedOption}
              </button>
              {isOptionsOpen && (
                <div className="absolute mt-1 w-full rounded-3xl bg-white shadow-lg z-20">
                  <ul
                    tabIndex={-1}
                    role="listbox"
                    className="rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                  >
                    <div className="flex justify-between items-center">
                      <li className="text-gray-900 cursor-default select-none relative flex items-center py-2 pl-3 pr-9">
                        {sortOrder}
                      </li>
                      <div
                        className="relative cursor-pointer mr-4 bg-slate-500 rounded-3xl w-12 h-6"
                        onClick={toggleSortOrder}
                      >
                        <div
                          className={clsx(
                            "absolute h-6 w-6 bg-blue-500 rounded-full transform transition-transform",
                            {
                              "left-0": sortOrder === "Ascending",
                              "right-0": sortOrder === "Descending",
                            }
                          )}
                        ></div>
                      </div>
                    </div>
                    <hr className="my-2 border-t-2 border-gray-300" />
                    {[
                      "Priority",
                      "Due Date",
                      "Created Date",
                      "Updated Date",
                      "Name",
                    ].map((option) => (
                      <li
                        key={option}
                        role="option"
                        onClick={() => selectOption(option)}
                        className="text-gray-900 cursor-default select-none relative rounded-3xl py-2 pl-3 pr-9 hover:bg-gray-200"
                      >
                        {option}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
          {/* Filter */}
          <label htmlFor="filter" className="sr-only">
            Order
          </label>
          <div id="filter" className="w-56 mt-4 md:m-0 h-10">
            <div className="relative w-full">
              <button
                onClick={toggleFilter}
                className="bg-white rounded-3xl w-full border cursor-pointer border-gray-300 shadow-sm pl-3 pr-10 py-2 text-left focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              >
                {selectedFilter}
              </button>
              {isFilterOpen && (
                <div className="absolute mt-1 w-full rounded-3xl bg-white shadow-lg z-20">
                  <ul
                    tabIndex={-1}
                    role="listbox"
                    className="rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                  >
                    {[
                      "All",
                      "High Priority",
                      "Medium Priority",
                      "Low Priority",
                      "Due Today",
                      "Due Tomorrow",
                      "Due This Week",
                    ].map((filter) => (
                      <li
                        key={filter}
                        role="option"
                        onClick={() => selectFilter(filter)}
                        className="text-gray-900 cursor-default select-none relative rounded-3xl py-2 pl-3 pr-9 hover:bg-gray-200"
                      >
                        {filter}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
