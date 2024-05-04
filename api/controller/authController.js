import UserSchema from '../models/User.js'
import bcrypt from 'bcryptjs'
import { createError } from '../utils/error.js'
import pkg from 'jsonwebtoken'
import { GenerateToken } from '../helper/token.js'
// REGISTER
export const register = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(req.body.password, salt)
        const user = new UserSchema({
            ...req.body,
            password: hash
        })
        await user.save()
        res.status(200).json({
            status: true,
            message: "User has been Created",
            data: user
        })
    } catch (err) {
        next(err)
    }
}
// LOGIN
export const login = async (req, res, next) => {
    const { jwt } = pkg
    try {
        const user = await UserSchema.findOne({ username: req.body.username })
        if (!user) return next(createError(404, "User not founded"))
        const isPasswordCheck = await bcrypt.compare(req.body.password, user.password)
        if (!isPasswordCheck) return next(createError(400, "Wrong password"))
        const token = GenerateToken({ data: user, expiresIn: '24h' })
        const { password, isAdmin, ...otherDetails } = user._doc
        res.cookie("access_token", token, { httpOnly: true }).status(200).json({
            status: true,
            message: "User Login Successfully",
            data: ({ details: { ...otherDetails }, isAdmin })
        })
    } catch (err) {
        next(err)
    }
}