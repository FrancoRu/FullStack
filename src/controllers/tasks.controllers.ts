import TasksModel from '../models/task.models'
import { UserToken } from '../types/types'
import { Request, Response } from 'express'
import { State, Importance } from '../types/types'
import projectModel from '../models/project.model'

interface RequestWithUserData extends Request {
  userData?: UserToken
}

export const getTasks = async (req: RequestWithUserData, res: Response) => {
  // const { project } = req.body

  const userId = req.userData?._id

  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' })
  }
  const tasks = await TasksModel.find({
    // project: project,
    user: userId
  })
  return res
    .status(200)
    .json({ data: tasks, message: 'Tasks searching succesfully' })
}

export const createTask = async (req: RequestWithUserData, res: Response) => {
  const { project, title, description, deadline, importance } = req.body
  if (Object.values(Importance).includes(importance)) {
    try {
      const existingTitle = await TasksModel.findOne({
        project: project,
        title: title
      })
      const Project = await projectModel.findById(project)
      if (existingTitle) {
        return res.status(409).json({
          message: `The title '${title}' already exists for in the project name '${Project?.nameproject}'`
        })
      }
      // developsTask(project)
      Project?.state === State.Finished &&
        updateProjectById(Project._id, State.Developing)
      const userId = req.userData?._id
      const username = req.userData?.username
      if (!username || !userId) {
        return res.status(401).json({ message: 'Unauthorized' })
      }
      const newTask = new TasksModel({
        project,
        createdBy: username,
        user: userId,
        title,
        description,
        deadline,
        importance,
        state: State.WithoutStarting
      })
      const savedTask = await newTask.save()
      return res.status(200).json({
        data: savedTask,
        message: ['Task created']
      })
    } catch (error: any) {
      return res
        .status(500)
        .json({ message: 'Error to save task', error: error.message })
    }
  } else {
    return res.status(400).json({ message: 'Importance not valid' })
  }
}

export const getTask = async (req: RequestWithUserData, res: Response) => {
  const taskId = req.params.id

  try {
    const userId = req.userData?._id

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const task = await TasksModel.findOne({
      _id: taskId,
      user: userId
    })

    if (!task) {
      return res.status(404).json({ message: 'task not found' })
    }

    return res.json(task)
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: 'Error to get tasks', error: error.message })
  }
}

export const deleteTask = async (req: RequestWithUserData, res: Response) => {
  const taskId = req.params.id
  const userId = req.userData?._id

  if (!taskId || !userId) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  try {
    const task = await TasksModel.findByIdAndDelete({
      _id: taskId,
      user: userId
    })
    if (!task) {
      return res.status(404).json({ message: 'task not found' })
    }

    return res.status(204).json({ message: 'task successfully deleted' })
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: 'Error to get tasks', error: error.message })
  }
}

export const updateTask = async (req: RequestWithUserData, res: Response) => {
  const taskId = req.params.id
  const userId = req.userData?._id

  if (!taskId || !userId) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  try {
    const task = await TasksModel.findOneAndUpdate(
      { _id: taskId, user: userId },
      req.body,
      {
        new: true
      }
    )

    req.body.state === State.Finished
      ? finishedTask(req.body.project)
      : updateProjectById(req.body.project, State.Developing)

    if (!task) {
      return res.status(404).json({ message: 'task not found' })
    }

    return res.status(200).json({
      data: task,
      message: ['Successfully modified tasks']
    })
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: 'Error to get tasks', error: error.message })
  }
}

const finishedTask = async (id: string): Promise<void> => {
  const tasks = await TasksModel.find({ project: id })

  const allTasksFinished = tasks.every((task) => task.state === State.Finished)

  allTasksFinished && updateProjectById(id, State.Finished)
}

// const developsTask = async (id: string): Promise<void> => {
//   const tasks = await TasksModel.find({ project: id })

//   const taskDev = tasks.some((task) => task.state === State.Developing)

//   taskDev && updateProjectById(id, State.Developing)
// }

const updateProjectById = async (
  id: string,
  stateUpdate: State
): Promise<void> => {
  try {
    // Buscar el proyecto por su _id
    const project = await projectModel.findById(id)

    // Verificar si el proyecto existe
    if (!project) {
      throw new Error('Proyecto no encontrado')
    }

    project.state = stateUpdate
    await project.save()
  } catch (error: any) {
    console.error('Error al actualizar el proyecto:', error.message)
    throw error // Puedes manejar el error de la forma que desees
  }
}
