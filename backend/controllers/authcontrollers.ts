import type { NextFunction, Response } from 'express'
import type { AuthRequest } from '../middleware/middleware.js'
import mongoose from 'mongoose'
import { userSchema } from '../schemas/schemas.js'
import createUser from '../services/createUser.js'
import accountLogin from '../services/accountLogin.js'
import { CONFIG } from '../utils/tokenConfig.js'

export const users = mongoose.model('users', userSchema)
export const userVerification = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try{
        const userId = req.user?.id
        if (!userId) {
           return res.status(401).json({ message: 'Out.' });
        }
        const user = await users.findById(userId).select('-password')
        return res.status(200).json(user)
    }catch(error){
        next(error)
    }
}
export const signUp = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try{
        const {password, name, email} = req.body
        await createUser({name, email, password})
        return res.status(201).json({ message: "User created successfully!" });
    }catch(error){
        next(error)
    }
}
export const logIn = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try{
        const {email, password} = req.body
        const {token, user} = await accountLogin(email, password)
        res.cookie('token', token, {
            path: '/',
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: CONFIG.COOKIE_MAX_AGE
        })
        return res.status(200).json(user)
    }catch(error: unknown){
       next(error)
    }
}
export const signOut = async (_: AuthRequest, res: Response, next: NextFunction) => {
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
