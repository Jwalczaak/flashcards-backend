import mongoose from 'mongoose'
import { UserRequest } from '../interfaces/User'
import validator from 'validator'
import { UserRole } from '../enums/UserRole.enum'
const userSchema = new mongoose.Schema<UserRequest>({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    surname: {
        type: String,
        required: [true, 'Surname is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email address'],
    },
    photo: {
        type: String,
    },
    role: {
        type: String,
        required: [true, 'Role is required'],
        enum: Object.values(UserRole),
        default: UserRole.USER,
    },
})

const User = mongoose.model('User', userSchema)

export default User
