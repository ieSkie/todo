import type { Filter } from "../types";
type TaskFiltersProps = {
  filter: Filter;
  setFilter: (filter: Filter) => void;
};

export default function TaskFilters({ filter, setFilter }: TaskFiltersProps) {
  const filters: Filter[] = ["All", "Active", "Completed"];
  const btnCreator = filters.map((item) => {
    return (
      <button
        key={item}
        onClick={() => setFilter(item)}
        className={
          filter === item
            ? "font-bold text-gray-900"
            : "text-gray-400 hover:text-gray-600"
        }
      >
        {item}
      </button>
    );
  });
  return <div className="flex flex-row m-4 gap-4 w-full">{btnCreator}</div>;
}
