import mongoose from 'mongoose'
import FlashcardCategory from '../models/flashcardCategoryModel'
import handlerFactoryController from './handlerFactoryController'
import catchAsync from '../utils/catchAsync'
import { NextFunction, Request, Response } from 'express'
import { JwtPayload } from 'jsonwebtoken'
import authService from '../services/auth.service'
import AppError from '../utils/AppError'
import Flashcard from '../models/flashcardModel'
import UserFlashcardProgress from '../models/userFlashcardProgress'

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
        const matchFlashcards: Record<string, any> = {}

        if (mode === 'global') {
            matchFlashcards.isGlobal = true
        } else if (mode === 'user') {
            matchFlashcards.userId = new mongoose.Types.ObjectId(userId)
        } else if (!mode) {
            matchFlashcards.$or = [
                { isGlobal: true },
                { userId: new mongoose.Types.ObjectId(userId) },
            ]
        } else {
            return next(new AppError('Invalid mode', 400))
        }

        const categories = await FlashcardCategory.find(matchFlashcards)

        res.status(200).json({
            status: 'success',
            results: categories.length,
            data: 'dsad',
        })
    }
)

const getCategoriesProgress = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const refreshToken: string = req.cookies.refreshToken
        const decoded = authService.verifyRefreshToken(
            refreshToken
        ) as JwtPayload
        const userId = decoded.userId as string

        const categories = await FlashcardCategory.find({
            $or: [
                {
                    isGlobal: true,
                },
                { userId: userId },
            ],
        })

        const categoryData = await Promise.all(
            categories.map(async (category) => {
                const flashcards = await Flashcard.find({
                    categoryId: category._id,
                })
                const flashcardIds = flashcards.map((f) => f._id)

                const progress = await UserFlashcardProgress.find({
                    userId,
                    flashcardId: { $in: flashcardIds },
                })

                const visitedCount = progress.filter((p) => p.visited).length
                const guessedCorrectly = progress.filter(
                    (p) => p.guessedCorrectly
                ).length

                const totalCount = flashcardIds.length

                return {
                    name: category.name,
                    description: category.description,
                    isGlobal: category.isGlobal,
                    userId: category.userId,
                    totalCount,
                    visitedCount,
                    guessedCorrectly,
                }
            })
        )
        res.status(200).json({
            status: 'success',
            results: categoryData,
        })
    }
)

const flashcardCategoryController = {
    getFlashcardsCategory,
    createFlashcardsCategory,
    updateFlashcardsCategory,
    deleteFlashcardsCategory,
    getUserCategoriesWithSessions,
    getCategoriesProgress,
}

export default flashcardCategoryController
