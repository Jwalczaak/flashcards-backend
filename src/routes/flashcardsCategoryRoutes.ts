import express from 'express'
import flashcardsCategoryController from '../controllers/flashcardCategoryController'
import authController from '../controllers/authController'
const flashcardCategoryRouter = express.Router()

flashcardCategoryRouter.use(authController.protect)

flashcardCategoryRouter
    .route('/')
    .get(flashcardsCategoryController.getAllFlashcardsCategories)
    .post(flashcardsCategoryController.createFlashcardsCategory)

flashcardCategoryRouter
    .route('/:id')
    .get(flashcardsCategoryController.getFlashcardsCategory)
    .patch(flashcardsCategoryController.updateFlashcardsCategory)
    .delete(flashcardsCategoryController.deleteFlashcardsCategory)

export default flashcardCategoryRouter
