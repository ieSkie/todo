import { type ITask } from "../types";

export const taskService = {
  async getTasks(): Promise<ITask[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        try {
          const task = localStorage.getItem("task");
          if (task) {
            resolve(JSON.parse(task));
          } else {
            resolve([]);
          }
        } catch (e) {
          if (e instanceof Error) {
            console.log(e.message);
          }
          resolve([]);
        }
      }, 2000);
    });
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
