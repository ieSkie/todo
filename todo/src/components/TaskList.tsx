import { type ITask, EFilter } from "../types";

type TaskListProps = {
  tasks: ITask[];
  filter: EFilter;
  onToggleStatus: (id: number) => void;
  onDeleteItem: (id: number) => void;
  searchQuery: string;
};

export default function TaskList({
  tasks,
  filter,
  onToggleStatus,
  onDeleteItem,
  searchQuery,
}: TaskListProps) {
  const visibleTasks = tasks.filter((task) => {
    const matchesSearch = task.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    if (filter === EFilter.Active)
      return task.isCompleted === false && matchesSearch;
    if (filter === EFilter.Completed)
      return task.isCompleted === true && matchesSearch;
    return matchesSearch;
  });
  const listOfTasks = visibleTasks.map((task) => {
    return (
      <li
        key={task.id}
        className="flex items-center justify-between w-full bg-white rounded-lg p-4 mb-2 shadow"
      >
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={task.isCompleted}
            onChange={() => onToggleStatus(task.id)}
          ></input>
          <span
            className={task.isCompleted ? "line-through text-gray-400" : ""}
          >
            {task.name}
          </span>
        </div>
        <button
          className="text-red-500 hover:text-red-700 text-sm"
          onClick={() => {
            onDeleteItem(task.id);
          }}
        >
          Удалить
        </button>
      </li>
    );
  });
  return <ul className="w-full">{listOfTasks}</ul>;
}
