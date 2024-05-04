import { useContext, useState } from 'react';
import './header.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBed, faCalendarDays, faCar, faPerson, faPlane, faTaxi } from '@fortawesome/free-solid-svg-icons'
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { format } from 'date-fns'
import { ListContext } from '../../App';
import { useNavigate } from 'react-router-dom';
import { SearchContext } from '../../context/SearchContext.jsx';
import { AuthContext } from '../../context/AuthContext.jsx';
const Header = ({ type }) => {
  const navigate = useNavigate()
  const [openDate, setOpenDate] = useState(false)
  const [openOptions, setOpenOptions] = useState(false)
  const [destination, setDestination] = useState("")
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1
  })
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);
  const handleOption = (name, operator) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operator === "i" ? options[name] + 1 : options[name] - 1
      }
    })
  }
  const searchHandler = () => {
    dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } })
    navigate('/hotels', { state: { destination, dates, options } })

  }
  const { user } = useContext(AuthContext)
  const { dispatch } = useContext(SearchContext)
  return (
    <div className='header'>
      <div className={type === "list" ? "headerContainer listmode" : "headerContainer"}>
        <div className="headerList">
          <div className="headerListItem active">
            <FontAwesomeIcon icon={faBed} />
            <span>Stays</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faPlane} />
            <span>Flights</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faCar} />
            <span>Car rentals</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faBed} />
            <span>Attractions</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faTaxi} />
            <span>Airport taxis</span>
          </div>
        </div>
        {type !== "list" && <><h1 className="headerTitle">
          A lifetime of discounts? It's Genius
        </h1>
          <p className='headerDesc'>
            Get rewarded for your travels - unlock instant savings of 10% or more with a free Ticketbooking account
          </p>
          {!user && <button className="headerBtn">
            Sign in / Register
          </button>}
          <div className="headerSearch">
            <div className="headerSearchItems">
              <FontAwesomeIcon icon={faBed} className='headerIcons' />
              <input
                type="text"
                placeholder='Where are you going?' className='headerSearchInput'
                onChange={e => setDestination(e.target.value)}
              />
            </div>
            <div className="headerSearchItems">
              <FontAwesomeIcon icon={faCalendarDays} className='headerIcons' />
              <span onClick={() => setOpenDate(!openDate)} className='headerSearchText'>{`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(dates[0].endDate, "MM/dd/yyyy")}`}</span>
              {openDate && <DateRange
                editableDateInputs={true}
                onChange={item => setDates([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={dates}
                minDate={new Date()}
                className='date'
              />}
            </div>
            <div className="headerSearchItems">
              <FontAwesomeIcon icon={faPerson} className='headerIcons' />
              <span onClick={() => setOpenOptions(!openOptions)} className='headerSearchText'>{`${options.adult} adults . ${options.children} children . ${options.room} rooms`}</span>
              {openOptions && <div className='options'>
                <div className="optionsItem">
                  <span className="optionText">Adult</span>
                  <div className="optionCounter">
                    <button disabled={options.adult <= 1} className="optionCounterButton" onClick={() => handleOption("adult", "d")}>-</button>
                    <span className="optionCounterNumber">{options.adult}</span>
                    <button className="optionCounterButton" onClick={() => handleOption("adult", "i")}>+</button>
                  </div>
                </div>
                <div className="optionsItem">
                  <span className="optionText">Children</span>
                  <div className="optionCounter">
                    <button disabled={options.children <= 0} className="optionCounterButton" onClick={() => handleOption("children", "d")}>-</button>
                    <span className="optionCounterNumber">{options.children}</span>
                    <button className="optionCounterButton" onClick={() => handleOption("children", "i")}>+</button>
                  </div>
                </div>
                <div className="optionsItem">
                  <span className="optionText">Room</span>
                  <div className="optionCounter">
                    <button disabled={options.room <= 1} className="optionCounterButton" onClick={() => handleOption("room", "d")}>-</button>
                    <span className="optionCounterNumber">{options.room}</span>
                    <button className="optionCounterButton" onClick={() => handleOption("room", "i")}>+</button>
                  </div>
                </div>
              </div>}
            </div>
            <div className="headerSearchItems">
              <button onClick={searchHandler} className='headerBtn'>Search</button>
            </div>
          </div></>}
      </div>
    </div>
  )
}

export default Header
