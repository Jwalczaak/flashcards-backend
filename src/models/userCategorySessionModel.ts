import mongoose, { Schema, Model } from 'mongoose'
import { UserCategorySessionDocument } from '../interfaces/UserCategorySession'
import { StatusEnum } from '../enums/Status.enum'

const UserCategorySessionSchema = new Schema<UserCategorySessionDocument>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User Id is required'],
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: 'FlashcardCategory',
        required: [true, 'Category Id is required'],
    },
    notVisitedFlashcardsIds: {
        type: [Schema.Types.ObjectId],
        ref: 'Flashcard',
        required: [true, 'Available flashcards are required'],
    },
    visitedFlashcardsIds: {
        type: [Schema.Types.ObjectId],
        ref: 'Flashcard',
        required: [true, 'Visited flashcards are required'],
    },
    guessedFlashcardsIds: {
        type: [Schema.Types.ObjectId],
        ref: 'Flashcard',
        required: [true, 'Guessed flashcards are required'],
    },
    lastReviewedAT: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        enum: Object.values(StatusEnum),
        default: StatusEnum.IN_PROGRESS,
        required: true,
    },
})

const UserCategorySession: Model<UserCategorySessionDocument> =
    mongoose.model<UserCategorySessionDocument>(
        'UserCategorySession',
        UserCategorySessionSchema
    )

export default UserCategorySession
