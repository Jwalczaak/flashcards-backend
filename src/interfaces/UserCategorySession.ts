import { ObjectId } from 'mongoose'
import { StatusEnum } from '../enums/Status.enum'

export interface createUserSessionRequest {
    userId: ObjectId
    categoryId: ObjectId
    visitedCount: string[]
    correctCount: number
}

export interface UserCategorySessionDTO {
    _id: ObjectId
    userId: ObjectId
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
