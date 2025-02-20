import express from 'express'
import cors from 'cors'
import userRouter from './routes/userRoutes'
import flashcardCategoryRouter from './routes/flashcardsCategoryRoutes'
import globalErrorHandler from './controllers/errorController'
import cookieParser from 'cookie-parser'
import AppError from './utils/AppError'
import flashcardRouter from './routes/flashcardRoutes'
const app = express()

app.use(express.json({ limit: '10kb' }))
app.use(cookieParser())

const corsOptions = {
    origin: 'http://localhost:4200', // Change to your frontend's URL
    methods: 'GET,POST,PUT,DELETE', // Allow any HTTP methods
    credentials: true, // Allow cookies to be sent if necessary
}

app.use(cors(corsOptions))

app.use('/api/v1/category', flashcardCategoryRouter)
app.use('/api/v1/flashcard', flashcardRouter)
app.use('/api/v1/auth', userRouter)

app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404))
})

app.use(globalErrorHandler)

export default app
