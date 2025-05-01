import { ObjectId } from 'mongoose'
import { StatusEnum } from '../enums/Status.enum'

export interface FlashcardCategoryDTO {
    _id: ObjectId
    userId: ObjectId
    //Change user id to assign form jwt and add username
    userName: string
    isGlobal: boolean
    name: string
    status: StatusEnum
    description: string | null
    flashcards?: ObjectId[]
    createdAt: Date
    updatedAt: Date
}
