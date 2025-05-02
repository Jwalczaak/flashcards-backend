import UserCategorySession from '../models/userCategorySessionModel'
import authService from '../services/auth.service'
import catchAsync from '../utils/catchAsync'
import { NextFunction, Request, Response } from 'express'
import { Model } from 'mongoose'
import { JwtPayload } from 'jsonwebtoken'
import Flashcard from '../models/flashcardModel'
import { StatusEnum } from '../enums/Status.enum'
import { UserCategorySessionDocument } from '../interfaces/UserCategorySession'

const getUserCategorySession = <T>(Model: Model<T>) =>
    catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const categoryId: string = req.params.categoryId
        const refreshToken: string = req.cookies.refreshToken
        const decoded: string | JwtPayload = authService.verifyRefreshToken(
            refreshToken
        ) as JwtPayload

        let allFlashcardsCount: number

        let session: UserCategorySessionDocument | null =
            await UserCategorySession.findOne({
                user: decoded.userId,
                categoryId: categoryId,
            }).populate('user', 'name')

        if (!session) {
            const flashcards = await Flashcard.find({ categoryId })
            const notVisitedFlashcardsIds: string[] = flashcards.map(
                (flashcard) => flashcard._id
            )

            session = await UserCategorySession.create({
                user: decoded.userId,
                categoryId: categoryId,
                visitedFlashcardsIds: [],
                guessedFlashcardsIds: [],
                notVisitedFlashcardsIds,
                lastReviewedAT: new Date(),
                status: StatusEnum.IN_PROGRESS,
            })
            allFlashcardsCount = notVisitedFlashcardsIds.length
        } else {
            allFlashcardsCount =
                session.notVisitedFlashcardsIds.length +
                session.visitedFlashcardsIds.length +
                session.guessedFlashcardsIds.length
        }

        // Ensure userId and userName are returned as string values
        res.status(200).json({
            status: 'success',
            data: {
                session,
                allFlashcardsCount,
            },
        })
    })

const sessionController = {
    getUserCategorySession,
}

export default sessionController
