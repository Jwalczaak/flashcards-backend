import { NextFunction, Request, Response } from 'express'
import User from '../models/userModel'
import catchAsync from '../utils/catchAsync'
import { UserDocument, UserEntity } from '../interfaces/User'
import AppError from '../utils/AppError'
import jwt from 'jsonwebtoken'
import { ObjectId } from 'mongoose'

import { DecodedToken } from '../interfaces/Auth'

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
    const token = signToken(user._id)

    res.cookie('jwt', token, {
        expires: new Date(
            Date.now() +
                parseInt(process.env.JWT_EXPIRES_IN!) * 24 * 60 * 60 * 1000
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

const logout = (req: Request, res: Response) => {
    res.cookie('jwt', 'loggedout', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true,
    })
    res.status(200).json({
        status: 'success',
        message: 'Logged out successfully',
    })
}

const protect = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let token: string | undefined

        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer ')
        ) {
            token = req.headers.authorization.split(' ')[1]
        } else if (req.cookies?.jwt) {
            token = req.cookies.jwt
        }

        if (!token) {
            return next(
                new AppError(
                    'You are not logged in! Please log in to access this resource.',
                    401
                )
            )
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET as string
        ) as DecodedToken

        const currentUser = await User.findById(decoded.id)

        if (!currentUser) {
            return next(
                new AppError(
                    'The user belonging to this token does no longer exist.',
                    401
                )
            )
        }
        next()
    } catch (error: any) {
        return next(
            new AppError('Invalid or expired token. Please log in again.', 401)
        )
    }
}

const authController = {
    signup,
    login,
    logout,
    protect,
}

export default authController
