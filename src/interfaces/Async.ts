import { NextFunction, Request, Response } from 'express'

export type Async = (
    req: Request,
    res: Response,
    next: NextFunction
) => Promise<void>
