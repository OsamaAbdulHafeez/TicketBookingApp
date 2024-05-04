import HotelSchema from '../models/Hotel.js'
import RoomSchema from '../models/Room.js'
import { createError } from '../utils/error.js'

export const createHotel = async (req, res) => {
    const newHotel = new HotelSchema(req.body)
    try {
        const hotelSave = await newHotel.save()
        res.status(200).json({
            status: false,
            message: "Hotel Register Successfull",
            data: hotelSave
        })
    } catch (error) {
        res.status(500).json(error)
    }
}
export const updateHotel = async (req, res, next) => {
    try {
        const updateHotel = await HotelSchema.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).json({
            status: true,
            message: "Hotel Update Successfull",
            data: updateHotel
        })
    } catch (err) {
        next(err)
    }
}
export const deleteHotel = async (req, res, next) => {
    try {
        await HotelSchema.findByIdAndDelete(req.params.id)
        res.status(200).json("Hotel has been Deleted")
    } catch (err) {
        next(err)
    }
}
export const getHotel = async (req, res, next) => {
    try {
        const hotel = await HotelSchema.findById(req.params.id)
        res.status(200).json(hotel)
    } catch (err) {
        next(err)
    }
}
export const getAllHotel = async (req, res, next) => {
    const { min, max, limit, ...others } = req.query
    try {
        const query = { ...others }
        if (min !== undefined && max !== undefined) {
            query.cheapestPrice = { $gt: min, $lt: max }
        }
        const hotels = await HotelSchema.find(query).limit(limit)
        res.status(200).json(hotels)
    } catch (err) {
        next(err)
    }
}
export const countByCity = async (req, res, next) => {
    const cities = req.query.cities.split(",")
    try {
        const lists = await Promise.all(cities.map((city) => {
            return HotelSchema.countDocuments({ city: city })
        }))
        res.status(200).json(lists)
    } catch (err) {
        next(err)
    }
}
export const countByType = async (req, res, next) => {
    try {
        const hotelCount = await HotelSchema.countDocuments({ type: "hotel" })
        const appartmentCount = await HotelSchema.countDocuments({ type: "appartment" })
        const resortCount = await HotelSchema.countDocuments({ type: "resort" })
        const villaCount = await HotelSchema.countDocuments({ type: "villa" })
        const cabinCount = await HotelSchema.countDocuments({ type: "cabin" })
        res.status(200).json([
            { type: "Hotel", count: hotelCount },
            { type: "Appartment", count: appartmentCount },
            { type: "Resort", count: resortCount },
            { type: "Villa", count: villaCount },
            { type: "Cabin", count: cabinCount },
        ])
    } catch (err) {
        next(err)
    }
}

export const getHotelRooms = async (req, res, next) => {
    try {
        const hotel = await HotelSchema.findById(req.params.id)
        const list = await Promise.all(hotel.rooms.map(room => {
            return RoomSchema.findById(room)
        }))
        res.status(200).json(list)
    } catch (err) {
        next(err)
    }
}