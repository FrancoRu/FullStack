import { ReactNode } from 'react'

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

interface ProviderProps {
  children: ReactNode
}

interface Numbers {
  number: number
  numberCompleted: number
  numberStarted: number
}
