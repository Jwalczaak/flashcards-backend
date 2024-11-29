import { NextFunction, Request, Response } from 'express'
import User from '../models/userModel'
import catchAsync from '../utils/catchAsync'
import { UserDocument, UserEntity } from '../interfaces/User'
import AppError from '../utils/AppError'
import jwt from 'jsonwebtoken'
import { ObjectId } from 'mongoose'

const signToken = (id: ObjectId) => {
    return jwt.sign({ id }, process.env.JWT_SECRET!, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    })
}

const createSendToken = (
    user: UserEntity,
    statusCode: number,
    req: Request,
    res: Response
) => {
    console.log(user)
    const token = signToken(user._id)

    res.cookie('jwt', token, {
        expires: new Date(
            Date.now() + parseInt(process.env.JWT_EXPIRES_IN!) * 1000
        ),
        httpOnly: true,
        secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
    })

    user.password = undefined

    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user,
        },
    })
}

const signup = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const newUser: UserEntity = await User.create({
            name: req.body.name,
            surname: req.body.surname,
            email: req.body.email,
            role: req.body.role,
            photo: req.body.photo,
            password: req.body.password,
            passwordConfirm: req.body.passwordConfirm,
        })

        createSendToken(newUser, 201, req, res)
    }
)

const login = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const { email, password } = req.body

        if (!email || !password) {
            return next(new AppError('Please provide email and password', 400))
        }

        const user = (await User.findOne({ email }).select(
            '+password'
        )) as UserDocument

        if (!user || !(await user.correctPassword(password, user.password))) {
            return next(new AppError('Incorrect email or password', 401))
        }

        createSendToken(user, 200, req, res)
    }
)

const authController = {
    signup,
    login,
}

export default authController
