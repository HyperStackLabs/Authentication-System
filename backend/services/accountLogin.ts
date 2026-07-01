import bcrypt from 'bcrypt'
import {CONFIG} from '../utils/tokenConfig.js'
import jwt from 'jsonwebtoken'
import { userSchema } from '../schemas/schemas.js'
import mongoose from 'mongoose'

const users = mongoose.model('users', userSchema)
export default async function accountLogin(email: string, password: string){
    const foundUser = await users.findOne({email})
            if(!foundUser?.password){
                throw new Error('Your password or email is wrong.')
            }
            const isTheSame = await bcrypt.compare(password, foundUser.password as string)
            if(!isTheSame){
                throw new Error('Your password or email is wrong.')
            }
            if(!process.env.JWT_SECRET){
                throw new Error('JWT_SECRET is missing')
            }
            interface JwtPayloadID {
                id: string
            }
            const token = jwt.sign({id: foundUser._id.toString()} satisfies JwtPayloadID, process.env.JWT_SECRET, {expiresIn: CONFIG.JWT_EXPIRES_IN})
            return { 
             token,
             user: {
                id: foundUser?.id,
                name: foundUser?.name,
                email: foundUser?.email
            }}
}