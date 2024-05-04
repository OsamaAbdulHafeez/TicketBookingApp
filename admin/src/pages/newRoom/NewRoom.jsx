import "./newRoom.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { roomInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import axios from "axios";

const NewRoom = () => {
  const [file, setFile] = useState("");
  const [hotelId, setHotelId] = useState(undefined)
  const [room,setRoom] = useState([])

  const { data, loading, error } = useFetch('/api/hotel')
  const handleChange = (e) => {
    setInfo(prev => ({ ...prev, [e.target.id]: e.target.value }))
  }

  const handleClick = async (e) => {
    e.preventDefault()
    const roomNumber = room.split(',').map(room=>({number:room}))
    try {
      await axios.post(`/api/room/${hotelId}`,{...info,roomNumber})
    } catch (error) {
      console.log(error)
    }
    
  }
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Room</h1>
        </div>
        <div className="bottom">

          <div className="right">
            <form>
              {roomInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input 
                  id={input.id}
                  type={input.type} 
                  placeholder={input.placeholder} 
                  onChange={handleChange}
                  />
                </div>
              ))}
              <div className="selectHotel">
                <label>Choose a hotel</label>
                <select id="hotelId" onChange={e => setHotelId(e.target.value)}>
                  {loading ? "Loading" : data && data.map(hotel => (
                    <option key={hotel._id} id={hotel._id}>{hotel.name}</option>
                  ))}
                </select>
              </div>
              <div className="formInput">
                <label>Rooms</label>
                <textarea onChange={e=>setRoom(e.target.value)} placeholder="give comma between room numbers"/>
              </div>
              
              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewRoom;
