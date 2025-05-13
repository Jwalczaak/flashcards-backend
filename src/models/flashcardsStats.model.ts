import mongoose from 'mongoose'
import { FlashcardsStatsDTO } from '../interfaces/FlashcardsStats'

const flashcardsStatsSchema = new mongoose.Schema<FlashcardsStatsDTO>(
    {
        flashcardId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'flashcard',
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
        },
        isGuessed: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
)

flashcardsStatsSchema.index({ flashcardId: 1, userId: 1 })
flashcardsStatsSchema.index({ flashcardId: 1 })

const FlashcardsStats = mongoose.model<FlashcardsStatsDTO>(
    'FlashcardsStats',
    flashcardsStatsSchema
)

export default FlashcardsStats
