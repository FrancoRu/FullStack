import mongoose, { Schema, Document } from 'mongoose'
import { saveproject } from '../types/types'
import { Importance, State } from '../types/types'

export interface projectDocument extends saveproject, Document {}

const projectsSchema = new Schema<projectDocument>(
  {
    nameproject: {
      type: String,
      required: true
    },
    createdBy: {
      type: String,
      required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    description: {
      type: String
    },
    deadline: {
      type: Date,
      required: true
    },
    importance: {
      type: String,
      enum: Object.values(Importance),
      required: true
    },
    state: {
      type: String,
      enum: Object.values(State),
      required: true
    }
  },
  {
    timestamps: true
  }
)

// Define el modelo de mongoose
const projectModel = mongoose.model<projectDocument>('project', projectsSchema)

export default projectModel
