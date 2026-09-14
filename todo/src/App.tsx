import "./index.css";
import { useState, useCallback, useEffect } from "react";
import { type ITask, EFilter } from "./types";
import TaskFilters from "./components/TaskFilters";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import TaskSearch from "./components/TaskSearch";
import { taskService } from "./services/taskService";

export default function App() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [filter, setFilter] = useState<EFilter>(EFilter.All);
  const [areTasksLoading, setAreTasksLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const onAddTask = useCallback(
    (name: string) => {
      const updated = taskService.addTask(tasks, name);
      setTasks(updated);
      taskService.saveTasks(updated);
    },
    [tasks],
  );

  const onDeleteTask = useCallback(
    (id: number) => {
      const updated = taskService.deleteTask(tasks, id);
      setTasks(updated);
      taskService.saveTasks(updated);
    },
    [tasks],
  );

  const onStatusToggle = useCallback(
    (id: number) => {
      const updated = taskService.toggleTaskStatus(tasks, id);
      setTasks(updated);
      taskService.saveTasks(updated);
    },
    [tasks],
  );

  useEffect(() => {
    async function loadTasks() {
      const loadedTasks = await taskService.getTasks();
      setTasks(loadedTasks);
      setAreTasksLoading(false);
    }
    loadTasks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center pt-16 px-4">
      <div className="w-full max-w-xl">
        <h1 className="text-4xl font-bold text-center mb-8">My tasks</h1>
        {areTasksLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="w-8 h-8 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            <TaskForm onAddTask={onAddTask} />
            <TaskSearch
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
            <TaskFilters filter={filter} setFilter={setFilter} />
            <TaskList
              tasks={tasks}
              filter={filter}
              onToggleStatus={onStatusToggle}
              onDeleteItem={onDeleteTask}
              searchQuery={searchQuery}
            />
          </>
        )}
      </div>
    </div>
  );
}
