import { useState } from "react"
import Header from "../header/Header"
import './style.css'

const EditAccount = ({ user, editAccount, setEditAccount }) => {
    const { id, username, password, imgUrl } = user
    const [input, setInput] = useState('')
    const [formValue, setFormValue] = useState({})
    const [submitType, setSubmitType] = useState('')
    const [warning, setWarning] = useState('')
    const [successMessage, setSuccessMessage] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        let state = { username, password, imgUrl }
        const { confirmPwd } = formValue

        if (submitType === 'pic') state.imgUrl = formValue.imgUrl
        if (submitType === 'username') state.username = formValue.username

        if (submitType === 'password') {
            state.password = formValue.password
            const passwordMatch = state.password === confirmPwd
            const passwordTooShort = state.password.length < 6

            if (!passwordMatch) {
                setWarning("Passwords don't match")
                setTimeout(() => setWarning(''), 5000)
            } else if (passwordTooShort) {
                setWarning("Password must be at least 6 characters")
                setTimeout(() => setWarning(''), 5000)
            } else {
                fetch(`http://localhost:4000/users/${id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(state)
                })
                    .then(_ => {
                        setEditAccount(!editAccount)
                        setInput('')
                        setSuccessMessage("Successfully Updated")
                        setTimeout(() => setSuccessMessage(''), 5000)
                    })

            }
        } else {
            fetch(`http://localhost:4000/users/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(state)
            })
                .then(_ => {
                    setEditAccount(!editAccount)
                    setInput('')
                    setSuccessMessage("Successfully Updated")
                    setTimeout(() => setSuccessMessage(''), 5000)
                })
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

    const handleNavigate = (accountNav) => setInput(accountNav)

    return (
        <div>
            <Header user={user} />
            <div onSubmit={handleSubmit} className="account-form-container">
                <h1>Edit Account</h1>
                {warning && <p className='warning'>{warning}</p>}
                <div className="account-nav-container">
                    <p
                        style={input === 'pic' ? { textDecoration: 'underline' } : { textDecoration: 'none' }}
                        className="account-form-nav"
                        onClick={() => handleNavigate('pic')}
                    >
                        Change Image
                    </p>
                    <p
                        style={input === 'username' ? { textDecoration: 'underline' } : { textDecoration: 'none' }}
                        className="account-form-nav"
                        onClick={() => handleNavigate('username')}
                    >
                        Change Username
                    </p>
                    <p
                        style={input === 'password' ? { textDecoration: 'underline' } : { textDecoration: 'none' }}
                        className="account-form-nav"
                        onClick={() => handleNavigate('password')}
                    >
                        Change Password
                    </p>
                </div>
                {successMessage && <p className='success'>{successMessage}</p>}
                {input === '' && <p className="start-note select-option">Select an option</p>}
                {input && <form className="game-form login-form register-form account-form">
                    {input === 'pic' && <input
                        onChange={handleChange}
                        className="form-input"
                        placeholder="New Image URL..."
                        name="imgUrl"
                        type="text"
                        required
                    />}
                    {input === 'username' && <input
                        onChange={handleChange}
                        className="form-input"
                        placeholder="New Username..."
                        name="username"
                        type="text"
                        required
                    />}
                    {input === 'password' && <input
                        onChange={handleChange}
                        className="form-input"
                        placeholder="New Password..."
                        name="password"
                        type="password"
                        required
                    />}
                    {input === 'password' && <input
                        onChange={handleChange}
                        className="form-input"
                        placeholder="Confirm Password..."
                        name="confirmPwd"
                        type="password"
                        required
                    />}
                    {input === 'pic' && <button
                        className="create-btn"
                        type="submit"
                        onClick={() => setSubmitType('pic')}
                    >
                        Submit URL
                    </button>}
                    {input === 'username' && <button
                        className="create-btn"
                        type="submit"
                        onClick={() => setSubmitType('username')}
                    >
                        Submit Username
                    </button>}
                    {input === 'password' && <button
                        className="create-btn"
                        type="submit"
                        onClick={() => setSubmitType('password')}
                    >
                        Submit Password
                    </button>}
                </form>}
            </div>
        </div>
    )
}

export default EditAccount