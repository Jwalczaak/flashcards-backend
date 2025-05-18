import { ObjectId } from 'mongoose'

export interface UserFlashcardProgressDTO {
    userId: ObjectId
    flashcardId: ObjectId
    categoryId: ObjectId
    visited: boolean
    guessedCorrectly: boolean
}

export interface UserFlashcardProgressResponse {
    _id: ObjectId
    userId: ObjectId
    flashcardId: ObjectId
    categoryId: ObjectId
    visited: boolean
    guessedCorrectly: boolean
}

export interface UserFlashcardProgressDocument
    extends UserFlashcardProgressResponse,
        Document {}
