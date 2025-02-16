import { NextFunction, Request, Response } from 'express'
import AppError from '../utils/AppError'

const handleCastErrorDB = (err: any) => {
    const message = `Invalid ${err.path}: ${err.value}`
    return new AppError(message, 400)
}

const handleDuplicateFieldsDB = (err: any) => {
    console.log(err)
    const value = err.message.match(/(["'])(\\?.)*?\1/)[0]

    const message = `Duplicate field value: ${value}. Please use another value!`
    return new AppError(message, 400)
}

const handleValidationErrorDB = (err: any) => {
    const errors = Object.values(err.errors).map((el: any) => el.message)
    const message = `Invalid input data. ${errors.join('. ')}`
    return new AppError(message, 400)
}

const handleJWTError = () =>
    new AppError('Invalid token. Please log in again!', 401)

const handleJWTExpiredError = () =>
    new AppError('Your token has expired! Please log in again.', 401)

const sendErrorProd = (err: any, req: Request, res: Response) => {
    if (req.originalUrl.startsWith('/api')) {
        console.log(err.message)
        if (err.isOperational) {
            return res.status(err.statusCode).json({
                status: err.status,
                message: err.message,
            })
        }

        return res.status(500).json({
            status: 'error',
            message: 'Something went very wrong!',
        })
    }

    if (err.isOperational) {
        return res.status(err.statusCode).render('error', {
            title: 'Something went went wrong!',
            msg: err.message,
        })
    }

    // Programming or other unknown error: don't leak error details

    console.error('ERROR 💥', err)
    return res.status(err.statusCode).render('error', {
        title: 'Something went wrong!',
        msg: 'Please try again later.',
    })
}

export default (err: any, req: Request, res: Response, next: NextFunction) => {
    console.log('dsdasd' + err.name)
    err.statusCode = err.statusCode || 500
    err.status =
        err.status ||
        (err.statusCode >= 400 && err.statusCode < 500 ? 'fail' : 'error')

    let error = Object.assign(err)
    error.message = err.message

    if (error.name === 'CaseError') error = handleCastErrorDB(error)
    if (error.code === 11000) error = handleDuplicateFieldsDB(error)

    if (error.name === 'ValidationError') error = handleValidationErrorDB(error)
    if (error.name === 'JsonWebTokenError') error = handleJWTError()
    if (error.name === 'TokenExpiredError') error = handleJWTExpiredError()

    sendErrorProd(error, req, res)
}
