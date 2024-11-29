import { UserRole } from '../enums/UserRole.enum'

export interface UserDTO {
    _id: string
    name: string
    surname: string
    email: string
    photo?: string
    role: UserRole
    password: string
    passwordConfirm: string | undefined
    __v: number
}

export interface UserDocument extends Document, UserDTO {
    correctPassword(
        candidatePassword: string,
        userPassword: string
    ): Promise<boolean>
}

export interface UserSignUpRequest {
    name: string
    surname: string
    email: string
    photo?: string
    role: UserRole
    password: string | undefined
    passwordConfirm: string | undefined
}

export interface UserLoginRequest {
    email: string
    passowrd: string
}

export interface UserEntity {
    _id: string
    name: string
    surname: string
    email: string
    role: UserRole
    password: string | undefined
    __v: number
}
