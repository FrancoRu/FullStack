import { Importance, State } from "./types.d";

interface BaseTask {
  project?: string;
  title?: string;
  description?: string;
  deadline?: Date;
  importance?: Importance;
}

interface CreateTask extends BaseTask {
  title: string;
  deadline: Date;
  Importance: Importance;
}

interface ModifiedTask extends BaseTask {
  state?: State;
  [key: string]: string | number | Date | Importance | State | undefined;
}

interface CompleteViewTask extends CreateTask {
  createdBy: string;
  user: string;
  title: string;
  state: State;
  createdAt: Date;
  updateAt: Date;
  _id: string;
  __v: number;
}

interface TaskContextProps {
  setSelectTasks: (index: string) => void;
  removeSelectTask: (index: string) => void;
  addTask: (value: CreateTask) => Promise<void>;
  getTasks: () => Promise<void>;
  modifiedTask: (value: ModifiedTask) => Promise<void>;
  removeTaskByProjectId: (index: string) => void;
  isFinished: (index: string) => boolean;
  logout: () => void;
  tasks: CompleteViewTask[] | null;
  selectTask: CompleteViewTask | null;
  firstCharge: boolean;
}
