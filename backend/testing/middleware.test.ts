import { vi, describe, it, expect, beforeEach } from "vitest";
import type { AuthRequest } from "../middleware/middleware.js";
import jwt, { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken'
import type { Response, NextFunction } from "express";
import { verifyToken } from "../middleware/middleware.js";
import type { AuthTokenPayload } from "../types/types.js";

vi.mock('jsonwebtoken', () => ({
    default: {
        verify: vi.fn(),
        JsonWebTokenError: class JsonWebTokenError extends Error {},
        TokenExpiredError: class TokenExpiredError extends Error {}
    }
}))

describe('verify token middleware', () => {
    let req: Partial<AuthRequest>
    let res: Partial<Response>
    let next: NextFunction

    beforeEach(() => {
        vi.clearAllMocks()

        req = {
            cookies: {}
        }
        res = {      
            status: vi.fn().mockReturnThis(),      
            json: vi.fn(),    
        }
        next = vi.fn()
    })
    it('should return a 401 if user is not there', () => {
        verifyToken(req as AuthRequest, res as Response, next)

        expect(res.status).toHaveBeenCalledWith(401)
        expect(res.json).toHaveBeenCalledWith({
            message: "You are not a user here."
        })
        expect(next).not.toHaveBeenCalledWith()
    })
    it('sets req.user and calls next if token is fake/not real', () => {
        const decodedUser = {id: 'blablabla', iat: 32848234, exp: 23948932}
    })
})