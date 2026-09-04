import type { Filter } from "../types";
type TaskFiltersProps = {
  filter: Filter;
  setFilter: (filter: Filter) => void;
};

export default function TaskFilters({ filter, setFilter }: TaskFiltersProps) {
  return (
    <div className="flex flex-row m-4 gap-4">
      <button onClick={() => setFilter("all")}>All</button>
      <button onClick={() => setFilter("active")}>Active</button>
      <button onClick={() => setFilter("completed")}>Completed</button>
    </div>
  );
}
