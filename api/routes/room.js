import express from 'express'
import { createRoom, deleteRoom, getAllRooms, getRoom, updateRoom, updateRoomAvailability } from '../controller/roomController.js'
import { verifyAdmin } from '../helper/token.js'
const roomRouter = express.Router()

// Create
roomRouter.post("/:hotelid",verifyAdmin,createRoom)

// Update
roomRouter.put("/:id",verifyAdmin,updateRoom)
roomRouter.put("/availability/:id",updateRoomAvailability)

// Delete
roomRouter.delete("/:id/:hotelid",verifyAdmin,deleteRoom)

// Get
roomRouter.get("/:id",getRoom)

// GetAll
roomRouter.get("/",getAllRooms)

export default roomRouter