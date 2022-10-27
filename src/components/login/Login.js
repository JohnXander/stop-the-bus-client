import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './style.css'
import jwtDecode from 'jwt-decode'

const Login = ({ setLoggedInId }) => {
    const [formValue, setFormValue] = useState({})
    const [warning, setWarning] = useState('')
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()

        fetch('http://localhost:4000/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formValue),
        })
            .then(res => res.json())
            .then(data => {
                if (data.error !== undefined) {
                    setWarning(data.error)
                    setTimeout(() => setWarning(''), 5000)
                } else {
                    const decoded = jwtDecode(data.token)
                    loginUser(decoded.username)
                }
            })
    }

    const loginUser = (authUsername) => {
        fetch(`http://localhost:4000/users?username=${authUsername}`)
            .then(res => res.json())
            .then(data => {
                setLoggedInId(data.users[0].id)
                navigate('/games')
            })
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormValue((prevState) => {
            return {
                ...prevState,
                [name]: value
            }
        })
    }

    const handleNavigate = () => navigate('/register')

    return (
        <form onSubmit={handleSubmit} className='game-form login-form'>
            <h2>Welcome Back!</h2>
            {warning && <p className='warning'>{warning}</p>}
            <input
                onChange={handleChange}
                className='form-input'
                placeholder='Username...'
                name='username'
                type="text"
                required
            />
            <input
                onChange={handleChange}
                className='form-input'
                placeholder='Password...'
                name='password'
                type="password"
                required
            />
            <button className='create-btn' type='submit'>Sign In</button>
            <div className='register-btn-container'>
                <p
                    className='create-btn register-btn'
                    onClick={handleNavigate}
                >
                    Create New Account
                </p>
            </div>
        </form>
    )
}

export default Login