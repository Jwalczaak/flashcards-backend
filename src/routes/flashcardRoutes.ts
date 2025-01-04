import express from 'express'
import authController from '../controllers/authController'
import flashcardController from '../controllers/flashcardController'

const flashcardRouter = express.Router()

flashcardRouter.use(authController.protect)

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
