import handlerFactoryController from './handlerFactoryController'
import Flashcard from '../models/flashcardModel'

const getFlashcard = handlerFactoryController.getOne(Flashcard)

const createFlashcard = handlerFactoryController.createOne(Flashcard)

const updateFlashcard = handlerFactoryController.updateOne(Flashcard)

const deleteFlashcard = handlerFactoryController.deleteOne(Flashcard)

const getAllFlashcards = handlerFactoryController.getAll(Flashcard)

const flashcardController = {
    getFlashcard,
    createFlashcard,
    updateFlashcard,
    deleteFlashcard,
    getAllFlashcards,
}

export default flashcardController
