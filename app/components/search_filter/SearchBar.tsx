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
    <div className="w-full">
      <label className="sr-only" htmlFor="search">
        Search
      </label>
      <input
        type="text"
        id="search"
        name="search"
        placeholder="Search tasks..."
        className="w-full p-2 sm:p-4 h-10 rounded-3xl text-black"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
}
