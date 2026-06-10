import express from 'express'
import { verifyToken } from './middleware/middleware.js'
import { logIn, signOut, signUp, tokenVerification } from './controllers/authcontrollers.js'

const router = express.Router()

router.get('/verify-token', verifyToken, tokenVerification)
router.post('/sign-up', signUp)
router.post('/log-in', logIn)
router.post('/sign-out', verifyToken, signOut)

export default router
