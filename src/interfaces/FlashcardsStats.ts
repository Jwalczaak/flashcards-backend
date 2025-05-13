import mongoose from 'mongoose'

export interface FlashcardsStatsDTO {
    _id: mongoose.Schema.Types.ObjectId
    flashcardId: mongoose.Schema.Types.ObjectId
    userId: mongoose.Schema.Types.ObjectId
    isGuessed: boolean
}
