import mongoose from 'mongoose'
import { UserCategorySessionDTO } from '../interfaces/UserCategorySession'
import { StatusEnum } from '../enums/Status.enum'

const userSchema = new mongoose.Schema<UserCategorySessionDTO>({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User Id is required'],
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FlashcardCategory',
        required: [true, 'Surname is required'],
    },
    visitedCount: {
        type: Number,
        required: [true, 'Visited count is required'],
    },
    correctCount: {
        type: Number,
        required: [true, 'Correct count is required'],
    },
    totalFlashcards: {
        type: Number,
        required: [true, 'Total flashcards is required'],
    },
    lastReviewedAT: {
        type: Date,
        default: Date.now(),
    },
    status: {
        type: String,
        required: [true, 'Status is required'],
        enum: Object.values(StatusEnum),
        default: StatusEnum.IN_PROGRESS,
    },
})

const User = mongoose.model('UserCategorySession', userSchema)

export default User
