import { CompleteViewTask, CreateTask } from '../types/task'
import axios from './axios'

export const PostTaskRequest = (task: CreateTask) =>
  axios.post('/panel/task/', task)

export const GetTasksRequest = () => axios.get('/panel/task/')

export const DeleteTaskRequest = (index: string) =>
  axios.delete(`/panel/task/${index}`)

export const PatchTasksRequest = (index: string, task: CompleteViewTask) =>
  axios.patch(`panel/task/${index}`, task)
