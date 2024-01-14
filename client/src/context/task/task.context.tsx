import React, { createContext, useState } from "react";
import {
  CompleteViewTask,
  CreateTask,
  ModifiedTask,
  TaskContextProps,
} from "../../types/task";
import {
  DeleteTaskRequest,
  GetTasksRequest,
  PatchTasksRequest,
  PostTaskRequest,
} from "../../api/task.request";
import { useError } from "../error/useError.Context";
import { ProviderProps, State } from "../../types/types.d";

export const TaskContext = createContext<TaskContextProps | undefined>(
  undefined
);

export const TaskProvider: React.FC<ProviderProps> = ({ children }) => {
  const [tasks, setTasks] = useState<CompleteViewTask[] | null>(null);
  const [selectTask, setSelectTask] = useState<CompleteViewTask | null>(null);
  const [firstCharge, setFirstCharge] = useState<boolean>(true);
  const { setError, setMessage } = useError();
  const setSelectTasks = (index: string) => {
    const task: CompleteViewTask | undefined = tasks?.find(
      (element) => element._id === index
    );
    setSelectTask(task ?? null);
  };

  const removeTaskByProjectId = (index: string) => {
    const newTask: CompleteViewTask[] | undefined = tasks?.filter(
      (element) => element.project !== index
    );
    setTasks(newTask ?? null);
  };

  const removeSelectTask = async (index: string) => {
    try {
      const res = await DeleteTaskRequest(index);
      const filteresTasks: CompleteViewTask[] | undefined = tasks?.filter(
        (element) => element._id !== index
      );
      setTasks(filteresTasks ?? null);
      setMessage(res.status, ["task successfully deleted"]);
    } catch (error: unknown) {
      setError(error);
    }
  };

  const logout = () => {
    setTasks(null);
    setFirstCharge(true);
    setSelectTask(null);
  };

  const addTask = async (value: CreateTask) => {
    try {
      const res = await PostTaskRequest(value);
      setTasks((prevTask) => [res.data.data, ...(prevTask || [])]);
      setMessage(res.status, res.data.message);
    } catch (error: unknown) {
      setError(error);
    }
  };

  const getTasks = async () => {
    try {
      const res = await GetTasksRequest();
      setTasks(res.data.data);
      setFirstCharge(!firstCharge);
    } catch (error: unknown) {
      setError(error);
    }
  };

  const isFinished = (index: string): boolean => {
    const allTasksFinished = tasks
      ?.filter((task) => task._id === index)
      .every((element) => element.state === State.Finished);

    return allTasksFinished ?? false;
  };

  const modifiedTask = async (value: ModifiedTask) => {
    try {
      if (!selectTask) throw new Error("A task must be selected first");
      const modifiedTaskValues: CompleteViewTask = {
        ...selectTask,
        ...value,
      };
      const res = await PatchTasksRequest(
        modifiedTaskValues._id,
        modifiedTaskValues
      );
      const newStateTasks: CompleteViewTask[] | undefined = tasks?.map(
        (element) => {
          if (element._id === modifiedTaskValues._id) {
            return { ...res.data.data };
          }
          return element;
        }
      );
      setTasks(newStateTasks ?? null);
    } catch (error: unknown) {
      setError(error);
    }
  };
  return (
    <TaskContext.Provider
      value={{
        tasks,
        selectTask,
        firstCharge,
        setSelectTasks,
        removeSelectTask,
        addTask,
        getTasks,
        modifiedTask,
        removeTaskByProjectId,
        isFinished,
        logout,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
