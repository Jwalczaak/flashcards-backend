import express from 'express'
import authController from '../controllers/authController'
import authMiddleware from '../middlewares/auth.middleware'
const userRouter = express.Router()

userRouter.post('/signup', authController.signup)
userRouter.post('/login', authController.login)
userRouter.get('/refresh', authController.refreshToken)

userRouter.use(authMiddleware.authenticateToken)
userRouter.get('/logout', authController.logout)

export default userRouter
