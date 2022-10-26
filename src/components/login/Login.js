import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './style.css'

const Login = ({ setLoggedInId }) => {
    const [formValue, setFormValue] = useState({})
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        const { username } = formValue
        fetch(`http://localhost:4000/users?username=${username}`)
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

    return (
        <form onSubmit={handleSubmit} className='game-form login-form'>
            <h2>Welcome Back!</h2>
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
                <button className='create-btn register-btn'>Create New Account</button>
            </div>
        </form>
    )
}

export default Login