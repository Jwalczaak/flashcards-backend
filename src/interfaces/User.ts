import { UserRole } from '../enums/UserRole.enum'

export interface UserDTO {
    name: string
    surname: string
    email: string
    photo?: string
    role: UserRole
    password: string
    passwordConfirm: string | undefined
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

export interface UserSignUpResponse {
    _id: number
    role: UserRole
    name: string
    email: string
    __v: string
}

export interface UserLoginRequest {
    email: string
    passowrd: string
}
