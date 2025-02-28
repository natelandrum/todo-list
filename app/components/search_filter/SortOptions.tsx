"use client";

import Dropdown from "./Dropdown";

type SortOptionsProps = {
  selectedOption: string;
  setSelectedOption: (option: string) => void;
  sortOrder: string;
  setSortOrder: (order: string) => void;
};

export default function SortOptions({
  selectedOption,
  setSelectedOption,
  sortOrder,
  setSortOrder,
}: SortOptionsProps) {
  return (
    <Dropdown
      label="Sort By"
      options={["Priority", "Due Date", "Created Date", "Updated Date", "Name"]}
      selectedValue={selectedOption}
      setSelectedValue={setSelectedOption}
      showToggle={true} // Enable sort order toggle
      toggleValue={sortOrder} // Pass Ascending/Descending state
      toggleAction={() =>
        setSortOrder(sortOrder === "Ascending" ? "Descending" : "Ascending")
      } // Function to toggle state
    />
  );
}
