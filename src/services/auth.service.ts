import { ObjectId } from 'mongoose'
import jwt from 'jsonwebtoken'
import { promisify } from 'util'

const generateAccessToken = (id: ObjectId) => {
    return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET!, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    })
}

const generateRefreshToken = (userId: ObjectId) => {
    return jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET!, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    })
}

const verifyAccessToken = (token: string) => {
    return new Promise<any>((resolve, reject) => {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!, (err, decoded) => {
            if (err) {
                reject(err)
            } else {
                resolve(decoded)
            }
        })
    })
}

const verifyRefreshToken = (token: string) => {
    return promisify(jwt.verify)(process.env.REFRESH_TOKEN_SECRET!)
}

const authService = {
    generateAccessToken,
    generateRefreshToken,
    verifyAccessToken,
    verifyRefreshToken,
}

export default authService
