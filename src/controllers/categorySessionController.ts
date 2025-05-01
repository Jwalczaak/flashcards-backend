import UserCategorySession from '../models/userCategorySessionModel'
import authService from '../services/auth.service'
import AppError from '../utils/AppError'
import catchAsync from '../utils/catchAsync'
import { NextFunction, Request, Response } from 'express'
import { Model } from 'mongoose'

const getUserCategorySession = <T>(Model: Model<T>) =>
    catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        // const doc = await Model.findById(req.params.id)
        const refreshToken: string = req.cookies.refreshToken
        const decoded: any = authService.verifyRefreshToken(refreshToken)
        console.log(decoded.userId)
        if (!decoded.userId) {
            return next(new AppError('No document found with that ID', 404))
        }

        res.status(200).json({
            status: 'success',
            // data: {
            //     data: doc,
            // },
        })
    })

const sessionController = {
    getUserCategorySession,
}

export default sessionController
