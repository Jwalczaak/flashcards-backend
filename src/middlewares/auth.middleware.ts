import { IGetUserAuthInfoRequest } from '../interfaces/Auth'
import { NextFunction, Response } from 'express'
import authService from '../services/auth.service'
import AppError from '../utils/AppError'
import catchAsync from '../utils/catchAsync'

const authenticateToken = catchAsync(
    async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
        const authHeader: string | undefined = req.headers['authorization']

        if (!authHeader)
            return next(
                new AppError(
                    'Invalid or expired token. Please log in again.',
                    401
                )
            )

        const token: string = authHeader.split(' ')[1]
        const decoded: any = authService.verifyAccessToken(token)
        req.body.userId = decoded.userId
        next()
    }
)

const authMiddleware = {
    authenticateToken,
}

export default authMiddleware
