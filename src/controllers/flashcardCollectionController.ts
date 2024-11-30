import { Request, Response, NextFunction } from 'express'
import FlashcardCollection from '../models/flashcardCollectionModel'
import handlerFactoryController from './handlerFactoryController'

const getFlashcardsCollection =
    handlerFactoryController.getOne(FlashcardCollection)

const createFlashcardsCollection =
    handlerFactoryController.createOne(FlashcardCollection)

const updateFlashcardsCollection =
    handlerFactoryController.updateOne(FlashcardCollection)

const deleteFlashcardsCollection =
    handlerFactoryController.deleteOne(FlashcardCollection)

const getUserFlashcardsCollection =

const flashcardCollectionController = {
    getFlashcardsCollection,
    createFlashcardsCollection,
    updateFlashcardsCollection,
    deleteFlashcardsCollection,
}

export default flashcardCollectionController
