import mongoose, { Document } from 'mongoose'

export type UserDocument = Document & {
  username: string
  password: string
  email?: string
  resources?: {
    name: string
    quantity: number
  }
}

export const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, unique: true },
  resources: {
    name: String,
    quantity: Number,
  },
})
