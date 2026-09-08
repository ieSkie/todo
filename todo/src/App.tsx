import "./index.css";
import { useState } from "react";
import { type ITask, EFilter } from "./types";
import TaskFilters from "./components/TaskFilters";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { taskService } from "./services/taskService";
const { getTasks, addTask, toggleTaskStatus, deleteTask, saveTasks } =
  taskService;

export default function App() {
  const [tasks, setTasks] = useState<ITask[]>(() => getTasks());
  const [filter, setFilter] = useState<EFilter>(EFilter.All);

  const onAddTask = (name: string) => {
    const updated = addTask(tasks, name);
    setTasks(updated);
    saveTasks(updated);
  };

  const onDeleteTask = (id: number) => {
    const updated = deleteTask(tasks, id);
    setTasks(updated);
    saveTasks(updated);
  };

  const onStatusToggle = (id: number) => {
    const updated = toggleTaskStatus(tasks, id);
    setTasks(updated);
    saveTasks(updated);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center pt-16 px-4">
      <div className="w-full max-w-xl">
        <h1 className="text-4xl font-bold text-center mb-8">My tasks</h1>
        <TaskForm onAddTask={onAddTask} />
        <TaskFilters filter={filter} setFilter={setFilter} />
        <TaskList
          tasks={tasks}
          filter={filter}
          onToggleStatus={onStatusToggle}
          onDeleteItem={onDeleteTask}
        />
      </div>
    </div>
  );
}
