import type { Task } from "../types";

type TaskListProps = {
  visibleTasks: Task[];
  toggleStatus: (id: number) => void;
  deleteItem: (id: number) => void;
};

export default function TaskList({
  visibleTasks,
  toggleStatus,
  deleteItem,
}: TaskListProps) {
  const listOfTasks = visibleTasks.map((task) => {
    return (
      <li key={task.id}>
        <input
          type="checkbox"
          checked={task.status}
          onChange={() => toggleStatus(task.id)}
        ></input>
        <span className={task.status ? "line-through text-gray-400" : ""}>
          {task.name}
        </span>
        <button
          className="text-red-500 hover:text-red-700 text-sm"
          onClick={() => {
            deleteItem(task.id);
          }}
        >
          Удалить
        </button>
      </li>
    );
  });
  return <ul>{listOfTasks}</ul>;
}
