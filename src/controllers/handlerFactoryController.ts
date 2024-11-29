import catchAsync from '../utils/catchAsync'
import { NextFunction, Request, Response } from 'express'
import AppError from '../utils/AppError'

import { Model, Document } from 'mongoose'
const deleteOne = (Model: Model<Document>) =>
    catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const doc = await Model.findByIdAndDelete(req.params.id)

        if (!doc) {
            return next(new AppError('No document found with that ID', 404))
        }

        res.status(204).json({
            status: 'success',
            data: null,
        })
    })

const updateOne = (Model: Model<Document>) =>
    catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        })

        if (!doc) {
            return next(new AppError('No document found with that ID', 404))
        }

        res.status(200).json({
            status: 'success',
            data: {
                data: doc,
            },
        })
    })

const createOne = <T>(Model: Model<T>) =>
    catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const doc = await Model.create(req.body)

        res.status(201).json({
            status: 'success',
            data: {
                data: doc,
            },
        })
    })

const getOne = (Model: Model<Document>, popOptions: string) =>
    catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        let query = Model.findById(req.params.id)
        if (popOptions) query = query.populate(popOptions)
        const doc = await query

        if (!doc) {
            return next(new AppError('No document found with that ID', 404))
        }

        res.status(200).json({
            status: 'success',
            data: {
                data: doc,
            },
        })
    })

const handlerFactoryController = {
    deleteOne,
    updateOne,
    createOne,
    getOne,
}

export default handlerFactoryController
