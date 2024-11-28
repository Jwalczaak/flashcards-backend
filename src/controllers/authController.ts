import { NextFunction, Request, Response } from 'express'
import User from '../models/userModel'
import catchAsync from '../utils/catchAsync'
import { UserSignUpRequest } from '../interfaces/User'
import AppError from '../utils/AppError'

const signup = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const newUser: UserSignUpRequest = await User.create({
            name: req.body.name,
            surname: req.body.surname,
            email: req.body.email,
            role: req.body.role,
            photo: req.body.photo,
            password: req.body.password,
            passwordConfirm: req.body.passwordConfirm,
        })

        // newUser.password = undefined

        res.status(200).json({
            status: 'success',
            data: {
                user: newUser,
            },
        })
    }
)

const login = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const { email, password } = req.body

        if (!email || !password) {
            return next(new AppError('Please provide email and password', 400))
        }

        const user = await User.findOne({ email }).select('+password')

        res.status(200).json({
            status: 'success',
            data: {
                user: user,
            },
        })
    }
)

const authController = {
    signup,
    login,
}

export default authController
