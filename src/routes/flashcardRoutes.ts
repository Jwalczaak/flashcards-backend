import express from 'express'
import flashcardController from '../controllers/flashcardController'
import authMiddleware from '../middlewares/auth.middleware'
const flashcardRouter = express.Router()

// flashcardRouter.use(authMiddleware.authenticateToken)
flashcardRouter
    .route('/')
    .get(flashcardController.getAllFlashcards)
    .post(flashcardController.createFlashcard)

flashcardRouter
    .route('/:id')
    .get(flashcardController.getFlashcard)
    .patch(flashcardController.updateFlashcard)
    .delete(flashcardController.deleteFlashcard)

export default flashcardRouter
