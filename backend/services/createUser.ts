import bcrypt from 'bcrypt'
import {CONFIG} from '../utils/tokenConfig.js'
import { users } from "../controllers/authcontrollers.js"
import { AuthError } from '../utils/customErrors.js'

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
        throw new AuthError('Users email or name already exists.', 409)
    }
    const newUser = new users({
        name,
        password: await bcrypt.hash(password, CONFIG.BCRYPT_SALT_ROUNDS),
        email
    })
    await newUser.save()
}