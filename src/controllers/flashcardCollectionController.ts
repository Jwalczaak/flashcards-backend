import FlashcardCollection from '../models/flashcardCollectionModel'
import handlerFactoryController from './handlerFactoryController'

const createFlashCardsCollection =
    handlerFactoryController.createOne(FlashcardCollection)

const flashcardCollectionController = {
    createFlashCardsCollection,
}

export default flashcardCollectionController
