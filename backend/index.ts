import 'dotenv/config'
import { connectDB } from './database/db.js'
import createServer from './server/server.js'

connectDB()
createServer().listen(4500, '0.0.0.0', () => console.log('running on 4500'))
