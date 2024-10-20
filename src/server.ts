import express, { Request, Response } from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import app from './app'

dotenv.config({
    path: './config.env',
})

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, TypeScript + Node.js + Express123!')
})

const DB: string = process.env.DATABASE!.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD!
)
mongoose
    .connect(DB)
    .then(() => {
        console.log('DB Connected ')
    })
    .catch((err: Error) => {
        console.error('Error connecting to database', err.message)
    })

const port: number = Number(process.env.PORT) || 3000
app.listen(port, () => {
    console.log(`App listening on port${port}`)
})
