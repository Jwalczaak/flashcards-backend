import mongoose from 'mongoose'
import { CollectionDTO } from '../interfaces/Collection'

const flashcardCollectionSchema = new mongoose.Schema<CollectionDTO>({
    userId: {
        type: mongoose.Schema.ObjectId,
        required: [true, 'userId is required'],
    },
    name: {
        type: String,
        required: [true, 'Name is required'],
        unique: true,
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

const FlashcardCollection = mongoose.model(
    'FlashcardCollection',
    flashcardCollectionSchema
)

export default FlashcardCollection
