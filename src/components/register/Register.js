import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import './style.css'

const Register = ({ setLoggedInId }) => {
    const [formValue, setFormValue] = useState({})
    const [warning, setWarning] = useState('')
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()

        const { username, password, imgUrl, confirm } = formValue
        const newAccount = { username, password, imgUrl }
        const passwordMatch = password === confirm

        if (passwordMatch) {
            fetch('http://localhost:4000/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newAccount),
            })
                .then(res => res.json())
                .then(data => {
                    setLoggedInId(data.user.id)
                    navigate('/games')
                })
        } else {
            setWarning("Passwords don't match")
            setTimeout(() => {
                setWarning('')
            }, 5000)
        }

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
        <>
            <h3 className='app-name landing-app-name'>Stop the Bus</h3>
            <div className="register-container">
                <form onSubmit={handleSubmit} className='game-form login-form register-form'>
                    <h2>Create a New Account</h2>
                    {warning && <p className='warning'>{warning}</p>}
                    <input
                        onChange={handleChange}
                        className='form-input'
                        placeholder='Profile Pic URL...'
                        name='imgUrl'
                        type="text"
                        required
                    />
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
                    <input
                        onChange={handleChange}
                        className='form-input'
                        placeholder='Confirm Password...'
                        name='confirm'
                        type="password"
                        required
                    />
                    <button className='create-btn' type='submit'>Sign Up</button>
                </form>
            </div>
        </>
    )
}

export default Register