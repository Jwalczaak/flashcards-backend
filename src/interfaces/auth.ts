import { JwtPayload } from 'jsonwebtoken'
import { Request } from 'express'
import { UserDocument } from './User'
export interface DecodedToken extends JwtPayload {
    id: string
}

export interface IGetUserAuthInfoRequest extends Request {
    user?: UserDocument
}
