import catchAsync from '../utils/catchAsync'
import { NextFunction, Request, Response } from 'express'
import AppError from '../utils/AppError'

import { Model, PopulateOptions } from 'mongoose'
import { APIFeatures } from '../utils/apiFeatures'
import { QueryParams } from '../interfaces/ApiFeaturesOptions'
const deleteOne = <T>(Model: Model<T>) =>
    catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const doc = await Model.findByIdAndDelete(req.params.id)

        console.log(doc)

        if (!doc) {
            return next(new AppError('No document found with that ID', 404))
        }

        res.status(204).json({
            status: 'success',
            data: null,
        })
    })

const updateOne = <T>(Model: Model<T>) =>
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

const getOne = <T>(
    Model: Model<T>,
    popOptions?: PopulateOptions | (string | PopulateOptions)[]
) =>
    catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        console.log(req.params.id)
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

const getAll = <T>(Model: Model<T>) =>
    catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const queryParams = req.query as QueryParams

        const filterHandlers: { [key: string]: (req: Request) => object } = {
            userId: () => ({ userId: req.params.userId }),
            isGlobal: () => ({ isGlobal: true }),
            categotyId: () => ({ categoryId: req.params.categoryId }),
        }

        let filter: object = {}
        for (const key of Object.keys(req.params)) {
            if (filterHandlers[key]) {
                filter = { ...filter, ...filterHandlers[key](req) }
            }
        }

        const features = new APIFeatures({
            query: Model.find(filter),
            queryString: queryParams,
        })
            .filter()
            .sort()
            .limitFields()
            .paginate()

        const doc = await features.getQuery()

        res.status(200).json({
            status: 'success',
            results: doc.length,

            data: doc,
        })
    })

const handlerFactoryController = {
    deleteOne,
    updateOne,
    createOne,
    getOne,
    getAll,
}

export default handlerFactoryController
