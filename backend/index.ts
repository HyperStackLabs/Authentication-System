import 'dotenv/config'
import express, { type NextFunction } from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { connectDB } from './database/db.js'
import authRouter from './app.js'
import { type Request, type Response } from 'express'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
const app = express()

const limiter = rateLimit({windowMs: 5 * 1000 * 60, limit: 10})
app.use(cookieParser(), helmet(), limiter)
app.use(express.json({limit: '1mb'}))
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || origin.includes('localhost') || origin.endsWith('.vercel.app')) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));
connectDB()
app.use(authRouter)
app.use((err: any, _: Request, res: Response, next: NextFunction) => {
    if (res.headersSent) return next(err)
    return res.status(err.status || 500).json({message: err.message || "There's a problem here..."})
})
app.listen(4500, '0.0.0.0', () => console.log('running on 4500'))
