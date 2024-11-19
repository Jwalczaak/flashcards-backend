import { NextFunction, Request, Response } from 'express'
import User from '../models/userModel'
import catchAsync from '../utils/catchAsync'

const signup = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const newUser = await User.create({
            name: req.body.name,
            surname: req.body.surname,
            email: req.body.email,
            role: req.body.role,
            photo: req.body.photo,
        })
        res.status(200).json({
            status: 'success',
            data: {
                user: newUser,
            },
        })
    }
)

const authController = {
    signup,
}

export default authController
