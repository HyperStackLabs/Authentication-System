import { describe, it, expect } from "vitest"
import { credentialsSchema, UserSchema, } from "./types"

describe('loginSchema', () => {
    it('should reject an invalid email', () => {
        const schemaTesting =  credentialsSchema.safeParse({
            email: 'mail50',
            password: 'password123'
        })
        expect(schemaTesting.success).toBe(false)
    })
    it('should reject a password under 6 characters', () => {
        const schemaTesting = credentialsSchema.safeParse({
            email: 'mail50@gmail.com',
            password: 'pass'
        })
        expect(schemaTesting.success).toBe(false)
    })
    it('should also reject a password over 16 characters', () => {
        const schemaTesting = credentialsSchema.safeParse({
            email: 'mail50@gmail.com',
            password: 'password12345678'
        })
        expect(schemaTesting.success).toBe(false)
    })
    it('should accept a password with appropriate amount of characters', () => {
        const schemaTesting = credentialsSchema.safeParse({
            email: 'mail50@gmail.com',
            password: 'password123'
        })
        expect(schemaTesting.success).toBe(true)
    })
    it('should accept a proper email format', () => {
        const schemaTesting = credentialsSchema.safeParse({
            email: 'mail50@gmail.com',
            password: 'password123'
        })
        expect(schemaTesting.success).toBe(true)
    })
})