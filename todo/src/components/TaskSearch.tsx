type TaskSearchProps = {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
};

export default function TaskSearch({
  searchQuery,
  setSearchQuery,
}: TaskSearchProps) {
  return (
    <div className="flex m-4 items-center relative">
      <input
        autoFocus
        placeholder="Find a task"
        className="border border-gray-300 rounded-md px-3 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
        type="text"
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
        }}
      ></input>
      <svg
        className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
        />
      </svg>{" "}
    </div>
  );
}
