import mongoose from 'mongoose'
import { FlashcardCategoryDTO } from '../interfaces/FlashcardsCategory'

const flashcardCategorySchema = new mongoose.Schema<FlashcardCategoryDTO>({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    isGlobal: {
        type: Boolean,
        default: false,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: function (this: FlashcardCategoryDTO): boolean {
            return !this.isGlobal
        },
    },
    description: {
        type: String,
        maxLength: 256,
    },
    sharedWith: {
        type: [mongoose.Schema.ObjectId],
    },
    flashcards: {
        type: [mongoose.Schema.ObjectId],
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    updatedAt: {
        type: Date,
        default: Date.now(),
    },
})

flashcardCategorySchema.path('userId').validate(function (value) {
    if (this.isGlobal && value) {
        return false
    }
    if (!this.isGlobal && !value) {
        return false
    }
    return true
}, 'Either isGlobal or userId must be set, but not both.')

flashcardCategorySchema.index(
    { name: 1, isGlobal: 1, userId: 1 },
    { unique: true, partialFilterExpression: { isGlobal: false } }
)

flashcardCategorySchema.index(
    { name: 1, isGlobal: 1 },
    { unique: true, partialFilterExpression: { isGlobal: true } }
)

const FlashcardCategory = mongoose.model(
    'FlashcardCategory',
    flashcardCategorySchema
)

export default FlashcardCategory
