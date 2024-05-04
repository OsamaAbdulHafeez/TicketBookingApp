import { useContext } from 'react'
import './navbar.css'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
const Navbar = () => {
  const { user } = useContext(AuthContext)
  const localUser = JSON.parse(localStorage.getItem('User'))
  const { loading, error, dispatch } = useContext(AuthContext)
  const logoutHandler = () => {
    localStorage.removeItem('User')
    dispatch({ type: "LOGOUT", payload: null })
  }
  return (
    <div className='navbar'>
      <div className="navContainer">
        <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
          <span className='logo'>Ticked Booking</span>
        </Link>
        {user || localUser ? (<div style={{display:'flex',alignItems:'center',gap:'10px'}}>
          <div>{localUser?.username}</div>
          <button className='navButton' onClick={logoutHandler}>Logout</button>
        </div>
        ) : (<div className="navItems">
          <button className='navButton'>Register</button>
          <button className='navButton'>Login</button>
        </div>)}
      </div>
    </div>
  )
}

export default Navbar
