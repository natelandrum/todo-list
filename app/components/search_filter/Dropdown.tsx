"use client";

import { useState } from "react";
import clsx from "clsx";

type DropdownProps = {
  label: string;
  options: string[];
  selectedValue: string;
  setSelectedValue: (value: string) => void;
  showToggle?: boolean;
  toggleValue?: string;
  toggleAction?: () => void;
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
    <div className="relative w-full">
      <label className="sr-only" htmlFor={label}>
        {label}
      </label>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="bg-white rounded-3xl w-full border cursor-pointer border-gray-300 shadow-sm px-3 py-2 text-left focus:outline-none text-sm sm:text-base"
        id={label}
      >
        {selectedValue}
      </button>
      {isOpen && (
        <div className="absolute mt-1 w-full rounded-3xl bg-white shadow-lg z-20">
          <ul className="max-h-60 overflow-auto rounded-md py-1 text-sm ring-1 ring-black ring-opacity-5">
            {/* Sort Order Toggle (Only Shown if Enabled) */}
            {showToggle && toggleValue && toggleAction && (
              <div className="flex justify-between items-center px-3 py-2 border-b border-gray-400">
                <span className="text-gray-900 text-sm">{toggleValue}</span>
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
                className="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9 hover:bg-gray-200"
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
