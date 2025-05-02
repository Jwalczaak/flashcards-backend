import { ObjectId } from 'mongoose'
import { StatusEnum } from '../enums/Status.enum'

export interface createUserSessionRequest {
    userId: ObjectId
    categoryId: ObjectId
    visitedCount: string[]
    correctCount: number
}

import { Document } from 'mongoose'

export interface UserCategorySessionDTO {
    user: ObjectId
    categoryId: ObjectId
    notVisitedFlashcardsIds: ObjectId[]
    visitedFlashcardsIds: ObjectId[]
    guessedFlashcardsIds: ObjectId[]
    lastReviewedAT: Date
    status: StatusEnum
}

export interface UserCategorySessionResponse {
    _id: ObjectId
    userId: ObjectId
    userName: string
    categoryId: ObjectId
    notVisitedFlashcardsIds: ObjectId[]
    visitedFlashcardsIds: ObjectId[]
    guessedFlashcardsIds: ObjectId[]
    lastReviewedAT: Date
    status: StatusEnum
    allFlashcardsCount: number
}

export interface UserCategorySessionDocument
    extends UserCategorySessionDTO,
        Document {}
