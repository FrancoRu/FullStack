import React, { createContext, useState } from "react";
import { ProviderProps, State } from "../../types/types.d";
import {
  CompleteViewProject,
  CreateProject,
  ModifiedProject,
  ProjectContextProps,
} from "../../types/project";
import {
  CreateProjectRequest,
  GetProjectsRequest,
  deleteProjectRequest,
  modifiedProjectRequest,
} from "../../api/project.request";
import { useError } from "../error/useError.Context";

export const ProjectContext = createContext<ProjectContextProps | undefined>(
  undefined
);

export const ProjectProvider: React.FC<ProviderProps> = ({ children }) => {
  const [projects, setProjects] = useState<CompleteViewProject[] | null>(null);
  const [firstCharge, setFirstCharge] = useState<boolean>(true);
  const [selectProjects, setSelectProjects] =
    useState<CompleteViewProject | null>(null);
  const { setError, setMessage } = useError();

  const addProject = async (value: CreateProject) => {
    try {
      const res = await CreateProjectRequest(value);
      setMessage(res.status, res.data.message);
      setProjects((prevProjects) => [res.data.data, ...(prevProjects || [])]);
    } catch (error: unknown) {
      setError(error);
    }
  };

  const getProjects = async () => {
    try {
      const res = await GetProjectsRequest();
      setProjects(res.data.data);
      setFirstCharge(false);
    } catch (error: unknown) {
      setError(error);
    }
  };

  const modifiedProject = async (value: ModifiedProject) => {
    try {
      if (!selectProjects) throw new Error("A project must be selected first");
      const modifiedProjectValues: CompleteViewProject = {
        ...selectProjects,
        ...value,
      };
      const res = await modifiedProjectRequest(
        modifiedProjectValues._id,
        modifiedProjectValues
      );
      const newStateProjects: CompleteViewProject[] | undefined = projects?.map(
        (element) => {
          if (element._id === modifiedProjectValues._id) {
            return { ...res.data.data };
          }
          return element;
        }
      );
      setProjects(newStateProjects ?? null);
    } catch (error: unknown) {
      setError(error);
    }
  };

  const setSelectProject = (index: string) => {
    const project: CompleteViewProject | undefined = projects?.find(
      (element) => element._id === index
    );
    setSelectProjects(project ?? null);
  };

  const modifiedUpdateProject = (
    index: string | undefined,
    newState: State | undefined
  ) => {
    if (index && newState) {
      setProjects((prevProjects) => {
        const projectsArray = prevProjects ?? [];
        const projectIndex = projectsArray.findIndex(
          (project) => project._id === index
        );
        if (projectIndex !== -1) {
          projectsArray[projectIndex].state = newState;
        }

        return projectsArray;
      });
    }
  };

  const logout = () => {
    setFirstCharge(true);
    setProjects(null);
    setSelectProjects(null);
  };

  const removeSelectProject = async (index: string) => {
    try {
      const res = await deleteProjectRequest(index);
      const filteredProjects: CompleteViewProject[] | undefined =
        projects?.filter((element) => element._id !== index);
      setProjects(filteredProjects ?? null);
      setMessage(res.status, ["project successfully deleted"]);
    } catch (error: unknown) {
      setError(error);
    }
  };

  return (
    <ProjectContext.Provider
      value={{
        getProjects,
        addProject,
        setSelectProject,
        removeSelectProject,
        modifiedProject,
        logout,
        modifiedUpdateProject,
        projects,
        firstCharge,
        selectProjects,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
