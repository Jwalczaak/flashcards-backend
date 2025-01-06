import { ObjectId } from 'mongoose'

export interface FlashcardCollectionDTO {
    _id: ObjectId
    userId: ObjectId
    name: string
    description?: string
    sharedWith?: ObjectId[]
    flashcards?: ObjectId[]
    createdAt: Date
    updatedAt: Date
}
