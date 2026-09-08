import { type ITask } from "../types";

export const taskService = {
  getTasks(): ITask[] {
    try {
      const task = localStorage.getItem("task");
      if (task) {
        return JSON.parse(task);
      } else {
        return [];
      }
    } catch (e) {
      if (e instanceof Error) {
        console.log(e.message);
      }
      return [];
    }
  },

  addTask(tasks: ITask[], name: string): ITask[] {
    const obj: ITask = {
      id: Date.now(),
      name: name,
      isCompleted: false,
      createdAt: Date.now(),
    };
    return [...tasks, obj];
  },

  deleteTask(tasks: ITask[], id: number): ITask[] {
    return tasks.filter((task) => task.id !== id);
  },

  toggleTaskStatus(tasks: ITask[], id: number): ITask[] {
    return tasks.map((task) =>
      task.id === id ? { ...task, isCompleted: !task.isCompleted } : task,
    );
  },

  saveTasks(tasks: ITask[]) {
    const task = JSON.stringify(tasks);
    localStorage.setItem("task", task);
  },
};
