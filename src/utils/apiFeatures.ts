import {
    ApiFeaturesOptions,
    QueryMongoose,
    QueryParams,
} from '../interfaces/ApiFeaturesOptions'

export class APIFeatures<DocType> {
    private query: QueryMongoose<DocType>
    private queryString: QueryParams
    constructor(options: ApiFeaturesOptions<DocType>) {
        this.query = options.query
        this.queryString = options.queryString
    }

    filter(): this {
        const queryObj = { ...this.queryString }
        const excludedFields: string[] = ['page', 'sort', 'limit', 'fields']
        excludedFields.forEach((field) => delete queryObj[field])

        let queryStr = JSON.stringify(queryObj)
        queryStr = queryStr.replace(
            /\b(gt|gte|lt|lte|in)\b/g,
            (match) => `$${match}`
        )

        this.query = this.query.find(JSON.parse(queryStr))
        return this
    }

    sort(): this {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ')
            this.query = this.query.sort(sortBy)
        } else {
            this.query = this.query.sort('-createdAt')
        }
        return this
    }

    limitFields(): this {
        if (this.queryString.fields) {
            const fields = this.queryString.fields.split(',').join(' ')
            this.query = this.query.select(fields)
        } else {
            this.query = this.query.select('-__v')
        }

        return this
    }

    paginate(): this {
        const page = parseInt(this.queryString.page || '1', 10)
        const limit = parseInt(this.queryString.limit || '10', 10)
        const skip = (page - 1) * limit

        this.query = this.query.skip(skip).limit(limit)
        return this
    }

    getQuery(): QueryMongoose<DocType> {
        return this.query
    }
}
