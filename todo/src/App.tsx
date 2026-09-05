import "./index.css";
import { useState, useEffect } from "react";
import type { Task, Filter } from "./types";
import TaskFilters from "./components/TaskFilters";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

export default function App() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const task = localStorage.getItem("task");
    if (task) {
      return JSON.parse(task);
    } else {
      return [];
    }
  });
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState<Filter>("All");
  const visibleTasks = tasks.filter((task) => {
    if (filter === "Active") return task.status === false;
    if (filter === "Completed") return task.status === true;
    return true;
  });

  function addTask() {
    if (!input.trim()) return;
    const copy = [...tasks];
    const obj = {
      id: Date.now(),
      name: input,
      status: false,
      createdAt: Date.now(),
    };
    copy.push(obj);
    setTasks(copy);
    setInput("");
  }

  function deleteItem(id: number) {
    const result = tasks.filter((task) => {
      return task.id != id;
    });
    setTasks(result);
  }

  function toggleStatus(id: number) {
    const result = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, status: !task.status };
      }
      return task;
    });
    setTasks(result);
  }

  useEffect(() => {
    const task = JSON.stringify(tasks);
    localStorage.setItem("task", task);
  }, [tasks]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center pt-16 px-4">
      <div className="w-full max-w-xl">
        <h1 className="text-4xl font-bold text-center mb-8">My tasks</h1>
        <TaskForm input={input} setInput={setInput} addTask={addTask} />
        <TaskFilters filter={filter} setFilter={setFilter} />
        <TaskList
          visibleTasks={visibleTasks}
          toggleStatus={toggleStatus}
          deleteItem={deleteItem}
        />
      </div>
    </div>
  );
}
