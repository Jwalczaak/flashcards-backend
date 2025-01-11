import { ObjectId } from 'mongoose'

export interface FlashcardDTO {
    _id: string
    name: string
    categoryId: ObjectId
    description?: string
    flashcardLanguage: string
    translation: string
    createdAt: Date
    updatedAt: Date
}
