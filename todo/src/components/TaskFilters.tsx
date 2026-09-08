import { EFilter } from "../types";
type TaskFiltersProps = {
  filter: EFilter;
  setFilter: (filter: EFilter) => void;
};

export default function TaskFilters({ filter, setFilter }: TaskFiltersProps) {
  const filters: EFilter[] = [EFilter.All, EFilter.Active, EFilter.Completed];
  const btnCreator = filters.map((item) => {
    return (
      <div>
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
      </div>
    );
  });
  return <div className="flex flex-row m-4 gap-4 w-full">{btnCreator}</div>;
}
