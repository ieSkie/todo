import "./index.css";
import { useState, useEffect } from "react";

type Task = {
  id: number;
  name: string;
  status: boolean;
  createdAt: number;
};

type Filter = "all" | "active" | "completed";

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
      <div className="flex flex-row m-4 gap-4">
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("active")}>Active</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
      </div>
      <ul>{listOfTasks}</ul>
      <div className="flex m-4">
        <input
          className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          type="text"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
        ></input>
        <button
          className="bg-blue-500 text-white px-4 py-2 m-5 rounded-md hover:bg-blue-600 transition ml-2"
          onClick={addTask}
        >
          Добавить задачу
        </button>
      </div>
    </div>
  );
}
