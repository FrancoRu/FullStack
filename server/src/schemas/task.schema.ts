import { z } from 'zod'
import { Importance, State } from '../types/types'

export const createTaskSchema = z.object({
  project: z.string(),
  // .refine(
  //   (value) => {
  //     try {
  //       mongoose.Types.ObjectId.createFromHexString(value)
  //       return true
  //     } catch (error) {
  //       return false
  //     }
  //   },
  //   {
  //     message: 'Must be a valid ObjectId'
  //   })
  title: z
    .string({
      required_error: 'Title is required'
    })
    .min(1),
  description: z.string().optional(),
  deadline: z.string().refine(
    (value) => {
      const parsedDate = new Date(value)
      return !isNaN(parsedDate.getTime()) // Verifica si es una fecha válida
    },
    {
      message: 'Debe ser una cadena de fecha válida'
    }
  ),
  importance: z.nativeEnum(Importance, {
    required_error: 'Importance is required'
  })
})

export const getTasksSchema = z.object({
  project: z.string()
})

export const updateTaskSchema = z.object({
  project: z.string(),
  title: z
    .string({
      required_error: 'Title is required'
    })
    .nullable(),
  description: z.string().nullable(),
  deadline: z
    .string()
    .refine(
      (value) => {
        const parsedDate = new Date(value)
        return !isNaN(parsedDate.getTime()) // Verifica si es una fecha válida
      },
      {
        message: 'Debe ser una cadena de fecha válida'
      }
    )
    .nullable(),
  importance: z
    .nativeEnum(Importance, {
      required_error: 'Importance is required'
    })
    .nullable(),
  state: z
    .nativeEnum(State, {
      required_error: 'State is required'
    })
    .nullable()
})
