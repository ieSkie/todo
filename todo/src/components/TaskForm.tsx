type TaskFormProps = {
  input: string;
  setInput: (value: string) => void;
  addTask: () => void;
};

export default function TaskForm({ input, setInput, addTask }: TaskFormProps) {
  return (
    <div className="flex m-4 items-center">
      <input
        placeholder="Type your task here..."
        className="border border-gray-300 rounded-md px-3 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
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
  );
}
