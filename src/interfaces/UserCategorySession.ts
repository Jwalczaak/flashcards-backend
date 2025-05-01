import { ObjectId } from 'mongoose'
import { StatusEnum } from '../enums/Status.enum'

export interface UserCategorySessionDTO {
    _id: ObjectId
    userId: ObjectId
    categoryId: ObjectId
    visitedCount: number
    correctCount: number
    totalFlashcards: number
    lastReviewedAT: Date
    status: StatusEnum
}
