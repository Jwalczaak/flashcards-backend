import mongoose, { Model, Schema } from 'mongoose'
import { UserFlashcardProgressDocument } from '../interfaces/userFlashcardProgress'

const UserFlashcardProgressSchema = new Schema<UserFlashcardProgressDocument>(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'User is required'],
        },

        flashcardId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Flashcard',
            required: [true, 'Flashcard  is required'],
        },
        categoryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
            required: [true, 'Flashcard  is required'],
        },
        visited: { type: Boolean, default: false },
        guessedCorrectly: { type: Boolean, default: false },
    },
    { timestamps: true }
)
const UserFlashcardProgress: Model<UserFlashcardProgressDocument> =
    mongoose.model<UserFlashcardProgressDocument>(
        'UserFlashcardProgress',
        UserFlashcardProgressSchema
    )

export default UserFlashcardProgress
