import mongoose from 'mongoose'
import { UserDocument } from '../interfaces/User'
import validator from 'validator'
import { UserRoleEnum } from '../enums/UserRole.enum'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema<UserDocument>({
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
        enum: Object.values(UserRoleEnum),
        default: UserRoleEnum.USER,
    },

    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: 8,
        select: false,
    },

    passwordConfirm: {
        type: String,
        required: [true, 'Password is required'],

        validate: {
            validator: function (el) {
                return el === this.password
            },
            message: 'Passwords are not the same!',
        },
    },
})

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next()

    this.password = await bcrypt.hash(this.password, 12)

    this.passwordConfirm = undefined

    next()
})

userSchema.methods.correctPassword = async function (
    candidatePassword: string,
    userPassword: string
) {
    return await bcrypt.compare(candidatePassword, userPassword)
}

const User = mongoose.model('User', userSchema)

export default User
