import z from 'zod'
import type { JwtPayload } from 'jsonwebtoken'
import { userSchema } from '../schemas/schemas.js'

export type User = z.infer<typeof userSchema>
export interface AuthTokenPayload extends JwtPayload {
    id: string
}