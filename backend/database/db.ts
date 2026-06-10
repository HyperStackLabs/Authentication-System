import mongoose from "mongoose";

export async function connectDB(){
    try{
        const databaseUrl = process.env.DATABASE_URL
        if (!databaseUrl) {
            throw new Error('DATABASE_URL is missing')
        }
        await mongoose.connect(databaseUrl)
        console.log('Successfully connected to the database!')
    }catch(error){
        console.log(`Failed to connect to the database due to: `, error)
        process.exit(1)
    }
}
