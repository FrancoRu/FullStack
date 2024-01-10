import { useContext } from 'react'
import { TaskContext } from './task.context'

export const useTask = () => {
  const context = useContext(TaskContext)
  if (!context) {
    throw new Error('useTasks must be used whithin an Task Provider')
  }
  return context
}
