import { CompleteViewProject } from '../types/project'
import { CompleteViewTask } from '../types/task'
import { Numbers } from '../types/types.d'

export const numbers = (
  iterator: CompleteViewProject[] | CompleteViewTask[] | null
) => {
  const num: Numbers = {
    number: iterator ? iterator.length : 0,
    numberCompleted: iterator
      ? iterator.reduce(
          (acc, element) => (element.state === 'Finished' ? acc + 1 : acc),
          0
        )
      : 0,
    numberStarted: iterator
      ? iterator.reduce(
          (acc, element) => (element.state === 'Developing' ? acc + 1 : acc),
          0
        )
      : 0
  }
  return num
}
