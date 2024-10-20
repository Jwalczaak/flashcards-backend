import express from 'express'
import authController from '../controllers/authController'
const userRouter = express.Router()

userRouter.post('/signup', authController.signup)

export default userRouter
