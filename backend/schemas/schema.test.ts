import { loginSchema, signUpSchema } from "./schemas.js"
import { describe, it, expect } from "vitest"

describe('loginSchema', () => {
    it('should reject an improper email', () => {
        const loginTesting = loginSchema.safeParse({
            email: 'email123',
            password: 'password123'
        })
        expect(loginTesting.success).toBe(false)
    })
    it('should accept a proper email', () => {
        const loginTesting = loginSchema.safeParse({
            email: 'email123@gmail.com',
            password: 'password123'
        })
        expect(loginTesting.success).toBe(true)
    })
})
describe('registerSchema', () => {
    it('should reject a name under 6 characters', () => {
        const registrationTesting = signUpSchema.safeParse({
            name: 'ez',
            email: 'email123@gmail.com',
            password: 'password123',
            id: '123'
        })
        expect(registrationTesting.success).toBe(false)
    })
    it('should accept a valid sign up data', () => {
        const registrationTesting = signUpSchema.safeParse({
            name: 'XenoBlitz',
            email: 'test@test.com',
            password: 'password123',
            id: '123'
        })
        expect(registrationTesting.success).toBe(true)
    })
})