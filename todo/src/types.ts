export type Task = {
  id: number;
  name: string;
  status: boolean;
  createdAt: number;
};

export type Filter = "All" | "Active" | "Completed";
