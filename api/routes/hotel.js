import express from 'express'
import { countByCity, countByType, createHotel, deleteHotel, getAllHotel, getHotel, getHotelRooms, updateHotel } from '../controller/hotelController.js'
import { verifyAdmin } from '../helper/token.js'
const hotelRouter = express.Router()

// Create
hotelRouter.post("/",verifyAdmin,createHotel)

// Update
hotelRouter.put("/:id",verifyAdmin,updateHotel)

// Delete
hotelRouter.delete("/:id",verifyAdmin,deleteHotel)

// Get
hotelRouter.get("/find/:id",getHotel)

// GetAll
hotelRouter.get("/",getAllHotel)
hotelRouter.get("/countByCity",countByCity)
hotelRouter.get("/countByType",countByType)
hotelRouter.get("/room/:id",getHotelRooms)

export default hotelRouter