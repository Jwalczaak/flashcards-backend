import { UserRole } from '../enums/UserRole.enum'

export interface UserRequest {
    name: string
    surname: string
    email: string
    photo?: string
    role: UserRole
}

export interface UserResponse {
    _id: number
    role: UserRole
    name: string
    email: string
    passwordConfirm: string
    __v: string
}
