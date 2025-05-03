import mongoose from 'mongoose'
import FlashcardCategory from '../models/flashcardCategoryModel'
import handlerFactoryController from './handlerFactoryController'
import catchAsync from '../utils/catchAsync'
import { NextFunction, Request, Response } from 'express'
import { JwtPayload } from 'jsonwebtoken'
import authService from '../services/auth.service'
import AppError from '../utils/AppError'

const getFlashcardsCategory = handlerFactoryController.getOne(FlashcardCategory)

const createFlashcardsCategory =
    handlerFactoryController.createOne(FlashcardCategory)

const updateFlashcardsCategory =
    handlerFactoryController.updateOne(FlashcardCategory)

const deleteFlashcardsCategory =
    handlerFactoryController.deleteOne(FlashcardCategory)

const getUserCategoriesWithSessions = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const refreshToken: string = req.cookies.refreshToken
        const decoded = authService.verifyRefreshToken(
            refreshToken
        ) as JwtPayload
        const userId = decoded.userId as string

        const mode = req.query.mode
        const match: Record<string, any> = {}

        if (mode === 'global') {
            match.isGlobal = true
        } else if (mode === 'user') {
            match.userId = new mongoose.Types.ObjectId(userId)
        } else if (!mode) {
            match.$or = [
                { isGlobal: true },
                { userId: new mongoose.Types.ObjectId(userId) },
            ]
        } else {
            return next(new AppError('Invalid mode', 400))
        }

        const categories = await FlashcardCategory.aggregate([
            {
                $match: match,
            },
            {
                $lookup: {
                    from: 'usercategorysessions',
                    let: { categoryId: '$_id' },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        {
                                            $eq: [
                                                '$categoryId',
                                                '$$categoryId',
                                            ],
                                        },
                                        {
                                            $eq: [
                                                '$user',
                                                new mongoose.Types.ObjectId(
                                                    userId
                                                ),
                                            ],
                                        },
                                    ],
                                },
                            },
                        },
                    ],
                    as: 'userSession',
                },
            },
            {
                $addFields: {
                    userSession: { $arrayElemAt: ['$userSession', 0] },
                },
            },
        ])

        res.status(200).json({
            status: 'success',
            results: categories.length,
            data: categories,
        })
    }
)

const flashcardCategoryController = {
    getFlashcardsCategory,
    createFlashcardsCategory,
    updateFlashcardsCategory,
    deleteFlashcardsCategory,
    getUserCategoriesWithSessions,
}

export default flashcardCategoryController
