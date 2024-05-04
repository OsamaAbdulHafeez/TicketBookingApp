import UserSchema from '../models/User.js'
export const updateUser = async (req, res) => {
    try {
        const updateUser = await UserSchema.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).json({
            status: true,
            message: "User Update Successfull",
            data: updateUser
        })
    } catch (error) {
        res.status(500).json(error)
    }
}
export const deleteUser = async (req, res) => {
    try {
        await UserSchema.findByIdAndDelete(req.params.id)
        res.status(200).json("User has been Deleted")
    } catch (error) {
        res.status(500).json(error)
    }
}
export const getUser = async (req, res) => {
    try {
        const user = await UserSchema.findById(req.params.id)
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json(error)
    }
}
export const getAllUser = async(req,res) => {
    try {
        const users = await UserSchema.find()
        res.status(200).json(users)
    } catch (err) {
        next(err)
    }
}