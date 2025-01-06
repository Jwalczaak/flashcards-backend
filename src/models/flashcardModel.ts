import mongoose from 'mongoose'
import { FlashcardDTO } from '../interfaces/Flashcard'

const flashcardSchema = new mongoose.Schema<FlashcardDTO>({
    name: {
        type: String,
        required: [false, 'Name is required'],
        unique: true,
    },
    description: {
        type: String,
        maxLength: 256,
    },
    flashcardLanguage: {
        type: String,
        required: [true, 'Flashcard language is required'],
    },
    translation: {
        type: String,
        required: [true, 'Translation is required'],
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
