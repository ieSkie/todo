import "./index.css";
import { useState, useEffect } from "react";
import { type ITask, EFilter } from "./types";
import TaskFilters from "./components/TaskFilters";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

export default function App() {
  const [tasks, setTasks] = useState<ITask[]>(() => {
    const task = localStorage.getItem("task");
    if (task) {
      return JSON.parse(task);
    } else {
      return [];
    }
  });
  const [filter, setFilter] = useState<EFilter>(EFilter.All);

  const onAddTask = (name: string) => {
    const copy = [...tasks];
    const obj = {
      id: Date.now(),
      name: name,
      isCompleted: false,
      createdAt: Date.now(),
    };
    copy.push(obj);
    setTasks(copy);
  };

  const onDeleteTask = (id: number) => {
    const result = tasks.filter((task) => {
      return task.id != id;
    });
    setTasks(result);
  };

  const onStatusToggle = (id: number) => {
    const result = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, status: !task.isCompleted };
      }
      return task;
    });
    setTasks(result);
  };

  useEffect(() => {
    const task = JSON.stringify(tasks);
    localStorage.setItem("task", task);
  }, [tasks]);

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
