import { NextFunction, Request, Response } from 'express'
import User from '../models/userModel'
import catchAsync from '../utils/catchAsync'
import { UserDocument, UserEntity } from '../interfaces/User'
import AppError from '../utils/AppError'
import { ObjectId } from 'mongoose'
import authService from '../services/auth.service'

const createSendToken = (
    userId: ObjectId,
    statusCode: number,
    req: Request,
    res: Response
) => {
    const accessToken: string = authService.generateAccessToken(userId)
    const refreshToken: string = authService.generateRefreshToken(userId)

    res.cookie('refreshToken', refreshToken, {
        maxAge: parseInt(process.env.REFRESH_TOKEN_EXPIRES_IN!) * 1000,
        httpOnly: true,
        sameSite: 'strict',
        secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
    })

    res.status(statusCode).json({
        status: 'success',
        accessToken,
    })
}

const refreshToken = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const refreshToken: string = req.cookies.refreshToken
        console.log('dsadas' + refreshToken)
        if (!refreshToken)
            return next(
                new AppError(
                    'You are not logged in! Please log in to access this resource.',
                    401
                )
            )

        const decoded: any = authService.verifyRefreshToken(refreshToken)

        createSendToken(decoded.userId, 201, req, res)
    }
)

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

        createSendToken(newUser._id, 201, req, res)
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

        createSendToken(user._id, 200, req, res)
    }
)

const logout = (req: Request, res: Response) => {
    res.clearCookie('refreshToken', {
        httpOnly: true,
        sameSite: 'strict',
        secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
    })
    res.status(200).json({
        status: 'success',
        message: 'Logged out successfully',
    })
}

const authController = {
    signup,
    login,
    logout,
    refreshToken,
}

export default authController
