import mongoose from "mongoose"
import { userSchema } from "../schemas/schemas.js"
import bcrypt from 'bcrypt'
import {CONFIG} from '../utils/tokenConfig.js'

const users = mongoose.model('users', userSchema)
interface User {
    name: string
    email: string
    password: string
}

export default async function createUser(userData: User){
    const {name, email, password} = userData
    const anotherUser = await users.findOne({
        $or: [
            {email: email},
            {name: name}
        ]
    })
    if(anotherUser){
        throw new Error('Users email or name already exists.')
    }
    const newUser = new users({
        name,
        password: await bcrypt.hash(password, CONFIG.BCRYPT_SALT_ROUNDS),
        email
    })
    await newUser.save()
}