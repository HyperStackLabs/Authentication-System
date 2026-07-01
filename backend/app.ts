import express from 'express'
import { verifyToken } from './middleware/middleware.js'
import { logIn, signOut, signUp, userVerification} from './controllers/authcontrollers.js'
import { validate } from './utils/validation.js'
import { loginSchema, signUpSchema } from './schemas/schemas.js'
import rateLimit from 'express-rate-limit'
const loginLimiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    limit: 5,
    message: "Sorry, ran out of login rate limits!"
})

const router = express.Router()

router.get('/verify-token', verifyToken, userVerification)
router.post('/sign-up', validate(signUpSchema), signUp)
router.post('/log-in', loginLimiter, validate(loginSchema), logIn)
router.post('/sign-out', verifyToken, signOut)

export default router
