import {z} from 'zod'
export const credentialsSchema = z.object({
    email: z.email(),
    password: z.string().min(6, 'Too short of a password').max(15, 'Huge password, nope.')
})
export type Credentials = z.infer<typeof credentialsSchema>
export interface User extends Credentials {
    name: string
    id: string
}
export const UserSchema = credentialsSchema.extend({
    name: z.string().min(6, 'Name is below 6 characters').max(20, 'Big name, boy.')
})