import express from 'express'
import flashcardsCollectionController from '../controllers/flashcardCollectionController'
const flashcardCollectionRouter = express.Router()

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
