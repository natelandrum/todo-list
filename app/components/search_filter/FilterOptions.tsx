"use client";

import Dropdown from "./Dropdown";

type FilterOptionsProps = {
  selectedFilter: string;
  setSelectedFilter: (filter: string) => void;
};

export default function FilterOptions({
  selectedFilter,
  setSelectedFilter,
}: FilterOptionsProps) {
  return (
    <Dropdown
      label="Filter By"
      options={[
        "All",
        "High Priority",
        "Medium Priority",
        "Low Priority",
        "Due Today",
        "Due Tomorrow",
        "Due This Week",
      ]}
      selectedValue={selectedFilter}
      setSelectedValue={setSelectedFilter}
    />
  );
}
