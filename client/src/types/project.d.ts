import mongoose from 'mongoose'
import { Importance, State } from './types.d'

interface BaseProject {
  nameproject?: string
  deadline?: Date
  importance?: Importance
  description?: string
}

interface CreateProject extends BaseProject {
  nameproject: string
  deadline: Date
  importance: Importance
}

interface ModifiedProject extends BaseProject {
  state?: State
  [key: string]: string | number | Date | Importance | State | undefined
}

interface ViewProject extends ModifiedProject {
  _id: string
  nameproject: string
  deadline: Date
  importance: Importance
  state: State
}

interface CompleteViewProject extends ViewProject {
  description: string
  createdBy: string
  user: mongoose.Schema.Types.ObjectId
  createdAt: Date
  updateAt: Date
  __v: number
}

interface ProjectContextProps {
  addProject: (value: CreateProject) => Promise<void>
  getProjects: () => Promise<void>
  modifiedProject: (value: ModifiedProject) => Promise<void>
  setSelectProject: (index: string) => void
  removeSelectProject: (index: string) => void
  logout: () => void
  modifiedUpdateProject: (
    indes: string | undefined,
    state: State | undefined
  ) => void
  selectProjects: CompleteViewProject | null
  projects: CompleteViewProject[] | null
  firstCharge: boolean
  // error: string[] | null
}
