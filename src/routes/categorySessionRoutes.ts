import express from 'express'
import categorySessionController from '../controllers/categorySessionController'
import UserCategorySession from '../models/userCategorySessionModel'

const categorySessionRouter = express.Router()

categorySessionRouter
    .route('/:categoryId')
    .get(categorySessionController.getUserCategorySession(UserCategorySession))

export default categorySessionRouter
