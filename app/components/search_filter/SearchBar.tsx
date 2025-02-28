"use client";

type SearchBarProps = {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
};

export default function SearchBar({
  searchTerm,
  setSearchTerm,
}: SearchBarProps) {
  return (
    <label htmlFor="search" className="sr-only">
      Search
      <input
        type="text"
        id="search"
        name="search"
        placeholder="Search tasks..."
        className="w-full md:max-w-[50%] p-4 h-10 rounded-3xl text-black"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </label>
  );
}
