import express from 'express'
import { deleteUser, getAllUser, getUser, updateUser } from '../controller/userController.js'
import { VerifyToken, verifyAdmin, verifyUser } from '../helper/token.js'
const userRouter = express.Router()

userRouter.get('/checkauthentication', VerifyToken,(req,res,next)=>{
    res.send("you are loggin")
})
userRouter.get('/checkUser/:id', verifyUser,(req,res,next)=>{
    res.send("you are loggin and you delete your account")
})
userRouter.put('/',verifyUser, updateUser)
userRouter.delete('/:id',verifyUser, deleteUser)
userRouter.get('/:id', getUser)
userRouter.get('/',verifyAdmin, getAllUser)


export default userRouter