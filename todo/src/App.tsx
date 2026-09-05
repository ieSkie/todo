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
  const [filter, setFilter] = useState<Filter>("all");
  const visibleTasks = tasks.filter((task) => {
    if (filter === "active") return task.status === false;
    if (filter === "completed") return task.status === true;
    return true;
  });
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
      <TaskFilters filter={filter} setFilter={setFilter} />
      <TaskList
        visibleTasks={visibleTasks}
        toggleStatus={toggleStatus}
        deleteItem={deleteItem}
      />
      <TaskForm input={input} setInput={setInput} addTask={addTask} />
    </div>
  );
}
