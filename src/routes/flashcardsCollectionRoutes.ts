import express from 'express'
import flashcardsCollectionController from '../controllers/flashcardCollectionController'
import authController from '../controllers/authController'
const flashcardCollectionRouter = express.Router()

flashcardCollectionRouter.use(authController.protect)

flashcardCollectionRouter
    .route('/')
    .post(flashcardsCollectionController.createFlashcardsCollection)

flashcardCollectionRouter
    .route('/:id')
    .get(flashcardsCollectionController.getFlashcardsCollection)
    .patch(flashcardsCollectionController.updateFlashcardsCollection)
    .delete(flashcardsCollectionController.deleteFlashcardsCollection)

flashcardCollectionRouter.route('/me')

export default flashcardCollectionRouter
