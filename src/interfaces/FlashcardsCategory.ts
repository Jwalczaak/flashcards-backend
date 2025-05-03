import { ObjectId } from 'mongoose'

export interface FlashcardCategoryDTO {
    _id: ObjectId
    userId: ObjectId
    userName: string
    isGlobal: boolean
    name: string
    description: string | null
    flashcards?: ObjectId[]
    createdAt: Date
    updatedAt: Date
}
