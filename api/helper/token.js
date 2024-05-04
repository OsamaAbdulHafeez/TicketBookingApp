import pkg from 'jsonwebtoken'
import { createError } from '../utils/error.js'

const { sign, verify } = pkg
export const GenerateToken = ({ data, expiresIn }) => {
    const { _id, isAdmin } = data
    return sign({ id: _id, isAdmin: isAdmin }, process.env.SECRET_KEY, { expiresIn: expiresIn })
}

export const VerifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        return next(createError(401, "You are Not Authenticated"))
    }

    verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) return next(createError(401, "Token is Not Valid"))
        req.user = user
        next()
    })
}

export const verifyUser = (req,res,next) => {
    VerifyToken(req,res,next,()=>{
        if(req.user.id === req.params.id || req.user.isAdmin){
            next()
        }else{
            return next(createError(401,"You are not Authorized"))
        }
    })
}

export const verifyAdmin = (req,res,next) => {
    VerifyToken(req,res,next,()=>{
        if(req.user.isAdmin){
            next()
        }else{
            return next(createError(401,"You are not Authorized"))
        }
    })
}