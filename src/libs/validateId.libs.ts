import { z } from 'zod'
import mongoose from 'mongoose'

export const objectIdSchema = z.string().refine(
  (value) => {
    try {
      mongoose.Types.ObjectId.createFromHexString(value)
      return true
    } catch (error) {
      return false
    }
  },
  {
    message: 'Must be a valid ObjectId'
  }
)
