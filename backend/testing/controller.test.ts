import 'dotenv/config'
import request from 'supertest'
import createServer from '../server/server.js';
import { describe, test, expect } from "vitest";
import express from 'express'

// A tiny fake app just to prove testing works
const app = express()
app.get('/health', (req, res) => {
    res.status(200).json({ message: 'Server is alive!' })
})

test('my very first test', async () => {
    // We test the fake app
    const res = await request(app).get('/health')
    
    // We expect it to work
    expect(res.status).toBe(200)
    expect(res.body.message).toBe('Server is alive!')
})