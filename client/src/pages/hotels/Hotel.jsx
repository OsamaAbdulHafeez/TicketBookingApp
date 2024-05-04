import './hotel.css'
import Navbar from '../../Components/Navbar/Navbar'
import Header from '../../Components/header/Header'
import { useContext, useState } from 'react'
import { ListContext } from '../../App'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleArrowLeft, faCircleArrowRight, faCircleXmark, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import MailList from '../../Components/mailList/MailList'
import Footer from '../../Components/footer/Footer'
import { useLocation, useNavigate } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'
import { SearchContext } from '../../context/SearchContext.jsx'
import { AuthContext } from '../../context/AuthContext.jsx'
import Reserve from '../../Components/reserve/Reserve.jsx'


const Hotel = () => {
  const location = useLocation()
  const id = location.pathname.split("/")[2]
  const { data, loading, error } = useFetch(`/api/hotel/find/${id}`)
  const { type } = useContext(ListContext)
  const [slideNumber, setSlideNumber] = useState(0)
  const [open, setOpen] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const navigate = useNavigate()
  const handleSlider = (i) => {
    setSlideNumber(i)
    setOpen(true)
  }
  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1
    }
    setSlideNumber(newSlideNumber)
  }
  const { dates, options } = useContext(SearchContext)

  console.log(dates,"==>dates")
  console.log(new Date(),"==>Abhi ki date")
  const MILI_SECONDS_PER_DAY = 24 * 60 * 60 * 1000
  const dayDifference = (date1, date2) => {
    console.log(date2.getTime(),"==>date2")
    console.log(date1.getTime(),"==>date1")
    const timeDiff = Math.abs(date2.getTime() - date1.getTime())
    const diffDays = Math.ceil(timeDiff / MILI_SECONDS_PER_DAY)
    console.log(diffDays,"==>diffDays")
    console.log(timeDiff,"==>timeDiff")
    return diffDays
  }
  const days = dayDifference(dates[0].endDate, dates[0].startDate)
  const { user } = useContext(AuthContext)
  const handleClick = () => {
    if (user) {
      setOpenModal(true)
    } else {
      navigate("/login")
      console.log("User nahi hai")
    }
  }
  return (
    <div>
      <Navbar />
      <Header type={type} />
      {loading ? "Loading" :
        <div className="hotelContainer">
          {open && <div className="slider">
            <FontAwesomeIcon icon={faCircleXmark} className='close' onClick={() => setOpen(false)} />
            <FontAwesomeIcon icon={faCircleArrowLeft} className='arrow' onClick={() => handleMove("l")} />
            <div className="sliderWrapper">
              <img src={data.photos[slideNumber]} alt="" className="sliderImg" />
            </div>
            <FontAwesomeIcon icon={faCircleArrowRight} className='arrow' onClick={() => handleMove("r")} />
          </div>}
          <div className="hotelWrapper">
            <h1 className="hotelTitle">{data.name}</h1>
            <button className='bookNow'>Reserve or Book Now</button>
            <div className="hotelAddress">
              <FontAwesomeIcon icon={faLocationDot} />
              <span>{data.address}</span>
            </div>
            <span className='hotelDistance'>Excellent location - {data.distance}m from center</span>
            <span className='hotelPriceHighlight'>
              Book a stay over $114 at this property and get a free airport taxi
            </span>
            <div className="hotelImages">
              {data.photos?.map((photo, i) => (
                <div className="hotelImgWrapper">
                  <img onClick={() => handleSlider(i)} src={photo} alt="" className="hotelImg" />
                </div>
              ))}
            </div>
            <div className="hotelDetails">
              <div className="hotelDetailsText">
                <h1 className='hotelTitle'>{data.title}</h1>
                <p className='hotelDesc'>
                  {data.desc}
                </p>
              </div>
              <div className="hotelDetailsPrice">
                <h1>Perfect for a night {days}-night stay!</h1>
                <span>
                  Located in the real heart of Krakow, this property has an
                  excellent location score of 9.8!
                </span>
                <h2>
                  <b>${days * data.cheapestPrice * options.room}</b> ({days} nights)
                </h2>
                <button onClick={handleClick}>Reserve or Book Now!</button>
              </div>
            </div>
          </div>
          <MailList />
          <Footer />
        </div>}
      {openModal && <Reserve setOpen={setOpenModal} hotelId={id} />}
    </div>
  )
}

export default Hotel
