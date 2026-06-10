import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken'

export interface AuthRequest extends Request  {
    user?: any
}

export const verifyToken = (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.cookies.token
    if(!token) return res.status(401).json({message: 'You are not a user here.'})
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET!)
        req.user = decoded
        next()
    }catch(error){
        if(error instanceof jwt.JsonWebTokenError || jwt.TokenExpiredError){
            return res.status(401).json({message: 'Invalid or expired token.'})
        }
        return next(error)
    } 
}