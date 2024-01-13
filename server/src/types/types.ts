import mongoose from 'mongoose'

export type UserToken = {
  _id: mongoose.Schema.Types.ObjectId
  username: string
  email: string
}

export enum Importance {
  Low = 'Low',
  Medium = 'Medium',
  High = 'High'
}
export enum State {
  WithoutStarting = 'Without Starting',
  Developing = 'Developing',
  Finished = 'Finished'
}

export interface tasks {
  project: mongoose.Schema.Types.ObjectId
  user: mongoose.Schema.Types.ObjectId
  createdBy: string
  title: string
  description?: string
  deadline: Date
  importance: Importance
}

export interface saveTasks extends tasks {
  state: State
}

export interface project {
  nameproject: string
  createdBy: string
  user: mongoose.Schema.Types.ObjectId
  description?: string
  deadline: Date
  importance: Importance
}

export interface saveproject extends project {
  state: State
}
