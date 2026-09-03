import "./index.css";
import { useState } from "react";

type Task = {
  id: number;
  name: string;
  status: boolean;
  createdAt: number;
};

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState("");
  const listOfTasks = tasks.map((task) => {
    return (
      <li key={task.id}>
        {task.name}
        <button
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

  return (
    <>
      <ul>{listOfTasks}</ul>
      <input
        type="text"
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
      ></input>
      <button onClick={addTask}>Добавить задачу</button>
    </>
  );
}
