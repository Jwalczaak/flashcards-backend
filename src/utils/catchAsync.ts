import { Async } from '../interfaces/Async'
import { NextFunction, Request, Response } from 'express'
export default (fn: Async) => {
    return (req: Request, res: Response, next: NextFunction) => {
        fn(req, res, next).catch(next)
    }
}
