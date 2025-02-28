"use client";

import { useState } from "react";
import clsx from "clsx";

type DropdownProps = {
  label: string;
  options: string[];
  selectedValue: string;
  setSelectedValue: (value: string) => void;
  showToggle?: boolean; // NEW: Show toggle option
  toggleValue?: string; // NEW: Toggle state (Ascending/Descending)
  toggleAction?: () => void; // NEW: Function to toggle state
};

export default function Dropdown({
  label,
  options,
  selectedValue,
  setSelectedValue,
  showToggle = false,
  toggleValue,
  toggleAction,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative mt-4 md:mt-0 w-full md:w-56">
      <label className="sr-only" htmlFor={label}>
        {label}
      </label>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="bg-white rounded-3xl w-full border cursor-pointer border-gray-300 shadow-sm pl-3 pr-10 py-2 text-left focus:outline-none"
        id={label}
      >
        {selectedValue}
      </button>
      {isOpen && (
        <div className="absolute mt-1 w-full rounded-3xl bg-white shadow-lg z-20">
          <ul className="rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 sm:text-sm">
            {/* Sort Order Toggle (Only Shown if Enabled) */}
            {showToggle && toggleValue && toggleAction && (
              <div className="flex justify-between items-center px-3 py-2 border-b border-gray-400">
                <span className="text-gray-900">{toggleValue}</span>
                <div
                  className="relative cursor-pointer bg-slate-500 rounded-3xl w-12 h-6"
                  onClick={toggleAction}
                >
                  <div
                    className={clsx(
                      "absolute h-6 w-6 bg-blue-500 rounded-full transform transition-transform",
                      {
                        "left-0": toggleValue === "Ascending",
                        "right-0": toggleValue === "Descending",
                      }
                    )}
                  ></div>
                </div>
              </div>
            )}

            {/* Dropdown Options */}
            {options.map((option) => (
              <li
                key={option}
                onClick={() => {
                  setSelectedValue(option);
                  setIsOpen(false);
                }}
                className="text-gray-900 cursor-default select-none relative rounded-3xl py-2 pl-3 pr-9 hover:bg-gray-200"
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
