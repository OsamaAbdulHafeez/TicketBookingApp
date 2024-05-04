import { useContext, useState } from 'react'
import './login.css'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate()
    const [credentials, setCredentials] = useState({
        username: undefined, password: undefined
    })

    const {loading, error, dispatch } = useContext(AuthContext)
    const handlechange = (e) => {
        setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }))
    }
    const handleClick = async (e) => {
        e.preventDefault()
        dispatch({ type: "LOGIN_START" })
        try {
            const res = await axios.post('/api/auth/login', credentials)
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data.data.details })
            navigate("/")
        } catch (err) {
            dispatch({ type: "LOGIN_FAILURE", payload: err.response.data })
            console.log(err.response.data.message)
            console.log(error)
           
        }
    }
    return (
        <div className='login'>

            <div className="lContainer">
                <h2>LOGIN FORM</h2>
                <input type="text" placeholder='User Name' id='username' onChange={handlechange} className='lInput' />
                <input type="password" placeholder='Password' id='password' onChange={handlechange} className='lInput' />
                <button onClick={handleClick} disabled={loading} className='lButton'>Login</button>
                {error && <span className='lmessage'>{error.message}</span>}
            </div>
        </div>
    )
}

export default Login
