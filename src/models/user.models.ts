import mongoose, { Schema, Document } from 'mongoose'

interface User {
  username: string
  email: string
  password: string
}

interface UserDocument extends User, Document {}

const userSchema: Schema<UserDocument> = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
)

const UserModel = mongoose.model<UserDocument>('User', userSchema)

export default UserModel
