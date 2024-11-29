import express from 'express'
import flashcardsCollectionController from '../controllers/flashcardCollectionController'
const flashcardCollectionRouter = express.Router()

flashcardCollectionRouter
    .route('/')
    .post(flashcardsCollectionController.createFlashCardsCollection)

export default flashcardCollectionRouter
