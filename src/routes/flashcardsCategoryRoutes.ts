import express from 'express'
import flashcardsCategoryController from '../controllers/flashcardCategoryController'
import { validateCategoryStatus } from '../middlewares/validateStatus.midleware'
const flashcardCategoryRouter = express.Router()

// flashcardCategoryRouter.use(authMiddleware.authenticateToken)

flashcardCategoryRouter
    .route('/')
    .get(flashcardsCategoryController.getUserCategoriesWithSessions)
    .post(
        validateCategoryStatus,
        flashcardsCategoryController.createFlashcardsCategory
    )

flashcardCategoryRouter
    .route('/:id')
    .get(flashcardsCategoryController.getFlashcardsCategory)
    .patch(flashcardsCategoryController.updateFlashcardsCategory)
    .delete(flashcardsCategoryController.deleteFlashcardsCategory)

export default flashcardCategoryRouter
