import mongoose from 'mongoose'
import { FlashcardDTO } from '../interfaces/Flashcard'

const flashcardSchema = new mongoose.Schema<FlashcardDTO>({
    name: {
        type: String,
        required: [false, 'Name is required'],
        unique: true,
        minlength: 3,
    },

    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'flashcardCategory',
        required: [true, 'Category is required'],
    },

    description: {
        type: String,
        maxLength: 256,
        minlength: 3,
    },
    flashcardLanguage: {
        type: String,
        required: [true, 'Flashcard language is required'],
        minlength: 2,
    },
    translation: {
        type: String,
        required: [true, 'Translation is required'],
        minlength: 3,
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
const Flashcard = mongoose.model('Flashcard', flashcardSchema)

export default Flashcard
