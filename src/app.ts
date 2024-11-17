import express from 'express'
import userRouter from './routes/userRoutes'
import globalErrorHandler from './controllers/errorController'

import AppError from './utils/AppError'
const app = express()

app.use(express.json({ limit: '10kb' }))

app.use('/api/v1/users', userRouter)

app.all('*', (req, res, next) => {
    console.log('dsadasdas')
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404))
})

app.use(globalErrorHandler)

export default app
