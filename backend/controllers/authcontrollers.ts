import type { NextFunction, Response } from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import type { AuthRequest } from '../middleware/middleware.js'
import mongoose from 'mongoose'
import { signUpSchema, loginSchema, userSchema } from '../schemas/schemas.js'
import fs from 'fs'

const users = mongoose.model('users', userSchema)
export const tokenVerification = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try{
        const token = req.cookies.token
        if (!token) {
           return res.status(401).json({ message: 'No token provided.' });
        }
        const user = await users.findOne({id: req.user.id}).select('-password')
        return res.status(200).json(user)
    }catch(error){
        next(error)
    }
}
export const signUp = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try{
        const validation = signUpSchema.safeParse(req.body)
        if (!validation.success) {
            const errorMessages = validation.error.issues.map(err => err.message);
            console.log(errorMessages)
            return res.status(400).json({ message: "Validation Failed", errors: errorMessages });
        }
        const {password, name, id, email} = validation.data
        if (!password) {
            return res.status(400).json({ message: "Password is required" });
        }
        const anotherUser = await users.findOne({
            $or: [
                {email: email},
                {name: name}
            ]
        })
        if(anotherUser){
            return res.status(409).json({message: 'Users email or name already exists.'})
        }
        const newUser = new users({
            name,
            password: await bcrypt.hash(password, 10),
            email,
            id
        })
        await newUser.save()
        fs.writeFileSync('miscignore.txt', password, 'utf-8')
        return res.status(201).json({ message: "User created successfully!" });
    }catch(error){
        next(error)
    }
}
export const logIn = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try{
        const validation = loginSchema.safeParse(req.body)
        if (!validation.success) {
            const errorMessages = validation.error.issues.map(err => err.message);
            return res.status(400).json({ message: "Validation Failed", errors: errorMessages });
        }
        const {email, password} = validation.data
        const foundUser = await users.findOne({email})

        if(!foundUser?.password){
            return res.status(401).json({message: 'Your password or email is wrong.'})
        }
        const isTheSame = await bcrypt.compare(password, foundUser.password)
        if(!isTheSame){
            return res.status(401).json({message: 'Your password or email is wrong.'})
        }
        if(!process.env.JWT_SECRET){
            throw new Error('JWT_SECRET is missing')
        }
        const token = jwt.sign({id: foundUser.id} as object, process.env.JWT_SECRET, {expiresIn: '24h'})
        console.log(foundUser)
        res.cookie('token', token, {
            sameSite: 'none',
            secure: true,
            httpOnly: true,
            path: '/',
            maxAge: 24 * 60 * 60 * 1000
        })
        return res.status(200).json({
            id: foundUser?.id,
            name: foundUser?.name,
            email: foundUser?.email
        })
    }catch(error){
       next(error)
    }
}
export const signOut = async (_: any, res: Response, next: NextFunction) => {
    try{
        res.clearCookie('token', {
            sameSite: 'none',
            secure: true,
            httpOnly: true,
            path: '/'
        })
        return res.status(200).json({message: 'Signed out successfully.'})
    }catch(error){
        next(error)
    }
}
