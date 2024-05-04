import RoomSchema from '../models/Room.js'
import HotelSchema from '../models/Hotel.js'
import { createError } from '../utils/error.js'

export const createRoom = async (req, res, next) => {
    const hotelId = req.params.hotelid
    const newRoom = new RoomSchema(req.body)
    try {
        const savedRoom = await newRoom.save()
        try {
            await HotelSchema.findByIdAndUpdate(hotelId, { $push: { rooms: savedRoom._id } })
            res.status(200).json(savedRoom)
        } catch (err) {
            next(err)
        }
    } catch (err) {
        next(err)
    }
}
export const updateRoom = async (req, res, next) => {
    try {
        const updateRoom = await RoomSchema.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).json({
            status: true,
            message: "Room Update Successfull",
            data: updateRoom
        })
    } catch (err) {
        next(err)
    }
}
export const updateRoomAvailability = async (req, res, next) => {
    try {
        await RoomSchema.updateOne({ "roomNumbers._id": req.params.id },
            {
                $push: {
                    "roomNumbers.$.unavailableDates": req.body.dates
                }
            }
        )
        res.status(200).json("Room Status has been updated")
    } catch (err) {
        next(err)
    }
}
export const deleteRoom = async (req, res, next) => {
    const hotelId = req.params.hotelid
    try {
        await RoomSchema.findByIdAndDelete(req.params.id)
        try {
            await HotelSchema.findByIdAndUpdate(hotelId, { $pull: { rooms: req.params.id } })
            res.status(200).json("Room has been deleted")
        } catch (err) {
            next(err)
        }
    } catch (err) {
        next(err)
    }
}
export const getRoom = async (req, res, next) => {
    try {
        const room = await RoomSchema.findById(req.params.id)
        res.status(200).json(room)
    } catch (err) {
        next(err)
    }
}
export const getAllRooms = async (req, res, next) => {
    try {
        const rooms = await RoomSchema.find()
        res.status(200).json(rooms)
    } catch (err) {
        next(err)
    }
}