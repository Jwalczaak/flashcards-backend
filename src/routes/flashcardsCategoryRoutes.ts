import express from 'express'
import flashcardsCategoryController from '../controllers/flashcardCategoryController'
import authMiddleware from '../middlewares/auth.middleware'
const flashcardCategoryRouter = express.Router()

// flashcardCategoryRouter.use(authMiddleware.authenticateToken)

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
