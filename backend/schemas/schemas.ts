import {z} from 'zod'
import mongoose from 'mongoose'
export const signUpSchema = z.object({
    name: z.string().min(6, 'Name is as tiny as your shrimp.').max(20, 'Too big of a name'),
    email: z.email(),
    password: z.string().min(6, "Password must be at least 6 characters").max(15, 'Too big of a password')
})
export const loginSchema = z.object({
    password: z.string(),
    email: z.email()
})
export const userSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
})