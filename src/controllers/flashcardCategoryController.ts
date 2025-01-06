import FlashcardCategory from '../models/flashcardCategoryModel'
import handlerFactoryController from './handlerFactoryController'

const getFlashcardsCategory = handlerFactoryController.getOne(FlashcardCategory)

const createFlashcardsCategory =
    handlerFactoryController.createOne(FlashcardCategory)

const updateFlashcardsCategory =
    handlerFactoryController.updateOne(FlashcardCategory)

const deleteFlashcardsCategory =
    handlerFactoryController.deleteOne(FlashcardCategory)

const getAllFlashcardsCategories =
    handlerFactoryController.getAll(FlashcardCategory)

const flashcardCategoryController = {
    getFlashcardsCategory,
    createFlashcardsCategory,
    updateFlashcardsCategory,
    deleteFlashcardsCategory,
    getAllFlashcardsCategories,
}

export default flashcardCategoryController
