import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './reserve.css'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import useFetch from '../../hooks/useFetch'
import { useContext, useEffect, useState } from 'react'
import { SearchContext } from '../../context/SearchContext'
import { DateRange } from 'react-date-range'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const Reserve = ({ setOpen, hotelId }) => {
    const [seletedRooms, setSelectedRooms] = useState([])
    const { data, loading, error } = useFetch(`/api/hotel/room/${hotelId}`)
    console.log(data)
    const { dates } = useContext(SearchContext)
    const navigate = useNavigate()
    const handleSelect = (e) => {
        const value = e.target.value
        const checked = e.target.checked
        setSelectedRooms(checked ?
            [...seletedRooms, value] :
            seletedRooms.filter(item => item !== value))
    }
    const getDateInRange = (startDate, endDate) => {
        const start = new Date(startDate)
        const end = new Date(endDate)
        const date = new Date(start.getTime())
        console.log(date)
        console.log(start.getTime())

        const dates = []
        while (date <= end) {
            dates.push(new Date(date).getTime())
            date.setDate(date.getDate() + 1)
        }
        return dates
    }
    const allDates = getDateInRange(dates[0].startDate, dates[0].endDate)

    console.log(allDates)
    const isAvailable = (roomNumber) => {
        console.log(roomNumber.unavailableDates, "==>unavailable Dates")
        const isFound = roomNumber.unavailableDates.some((date) =>
            allDates.includes(new Date(date).getTime())
        )
        return isFound
    }
    const handleClick = async () => {
        try {
            await Promise.all(seletedRooms.map(roomId => {
                const updateDates = allDates.map(date => {
                    const country = new Date(date)
                    country.setHours(country.getHours() + 5)
                    return country
                })
                const res = axios.put(`/api/room/availability/${roomId}`, { dates: updateDates })
                return res.data

            }))
            setOpen(false)
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='reserve'>
            <div className="rContainer">
                <FontAwesomeIcon icon={faCircleXmark} className='rClose' onClick={() => setOpen(false)} />
                <span>Select your rooms:</span>
                {data.map(item => (
                    <div className='rItem'>
                        <div className="rItemInfo">
                            <div className="rTitle">{item.title}</div>
                            <div className="rDesc">{item.desc}</div>
                            <div className="rMax">Max People:<b>{item.maxPeople}</b></div>
                            <div className="rPrice">{item.price}</div>
                        </div>
                        <div className='selectedRooms'>
                            {item.roomNumbers.map(roomNumber => (
                                <div className="room">
                                    <label htmlFor="">{roomNumber.number}</label>
                                    <input
                                        type="checkbox"
                                        value={roomNumber._id}
                                        onChange={handleSelect}
                                        disabled={isAvailable(roomNumber)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
                <button onClick={handleClick} className='rButton'>Reserve Now!</button>
            </div>
        </div>
    )
}

export default Reserve
