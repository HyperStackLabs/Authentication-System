import {z} from 'zod'
import mongoose from 'mongoose'
export const signUpSchema = z.object({
    name: z.string().min(6, 'Name is as tiny as your shrimp.').max(20, 'Too big of a name'),
    id: z.string(),
    email: z.email(),
    password: z.string().min(2, "Password must be at least 2 characters").max(15, 'Too big of a password')
})
export const loginSchema = z.object({
    password: z.string(),
    email: z.email()
})
export const userSchema = new mongoose.Schema({
    name: String,
    password: { type: String, required: false },
    email: String,
    id: String
})