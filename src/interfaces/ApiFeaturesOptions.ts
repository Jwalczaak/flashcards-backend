import { Query } from 'mongoose'

export type QueryParams = {
    sort?: string
    page?: string
    limit?: string
    fields?: string
    [key: string]: string | undefined
}

export type QueryMongoose<DocType> = Query<DocType[], DocType>

export type ApiFeaturesOptions<DocType> = {
    query: QueryMongoose<DocType>
    queryString: QueryParams
}
