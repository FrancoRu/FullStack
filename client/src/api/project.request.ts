import { CreateProject, ModifiedProject } from '../types/project'
import axios from './axios'

export const CreateProjectRequest = (project: CreateProject) =>
  axios.post('/panel/project/', project)

export const GetProjectsRequest = () => axios.get('/panel/project/')

export const deleteProjectRequest = (index: string) =>
  axios.delete(`/panel/project/${index}`)

export const modifiedProjectRequest = (
  index: string,
  project: ModifiedProject
) => axios.patch(`/panel/project/${index}`, project)
