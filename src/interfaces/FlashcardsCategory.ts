import { ObjectId } from 'mongoose'

export interface FlashcardCategoryDTO {
    _id: ObjectId
    userId: ObjectId
    isGlobal: boolean
    name: string
    description?: string
    sharedWith?: ObjectId[]
    flashcards?: ObjectId[]
    createdAt: Date
    updatedAt: Date
}
