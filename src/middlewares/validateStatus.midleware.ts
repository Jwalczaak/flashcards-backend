import { Request, Response, NextFunction } from 'express'
import AppError from '../utils/AppError'

export const validateCategoryStatus = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    if (req.body.status) {
        return next(
            new AppError(`Invalid status. You can't set init status.`, 400)
        )
    }

    next()
}
