export interface ITask {
  id: number;
  name: string;
  isCompleted: boolean;
  createdAt: number;
}
export enum EFilter {
  All = "All",
  Active = "Active",
  Completed = "Completed",
}
