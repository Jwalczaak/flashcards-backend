export interface FlashcardDTO {
    _id: string
    name: string
    description?: string
    flashcardLanguage: string
    translation: string
    createdAt: Date
    updatedAt: Date
}
