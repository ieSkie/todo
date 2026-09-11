import { useState } from "react";
type TaskFormProps = {
  onAddTask: (name: string) => void;
};

export default function TaskForm({ onAddTask }: TaskFormProps) {
  const [addTaskInputValue, setAddTaskInputValue] = useState("");
  const handleAddClick = () => {
    if (!addTaskInputValue.trim()) return;
    onAddTask(addTaskInputValue);
    setAddTaskInputValue("");
  };
  return (
    <div className="flex m-4 items-center">
      <input
        placeholder="Type your task here..."
        className="border border-gray-300 rounded-md px-3 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
        type="text"
        value={addTaskInputValue}
        onChange={(e) => {
          setAddTaskInputValue(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleAddClick();
        }}
      ></input>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition ml-2"
        onClick={handleAddClick}
      >
        Добавить задачу
      </button>
    </div>
  );
}
