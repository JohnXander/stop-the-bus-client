import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './style.css'

const CreateName = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const userId = location.state.user.id
    const [formValue, setFormValue] = useState({})

    const handleSubmit = (e) => {
        e.preventDefault()
        const { name } = formValue
        fetch('http://localhost:4000/games', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, userId: +userId }),
        })
            .then(res => res.json())
            .then(data => navigate('/create/teams', { state: { data } }))
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormValue((prevState) => {
            return {
                ...prevState,
                [name]: value,
            }
        })
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className='game-form'>
                <h3>Create New Game</h3>
                <div>
                    <label>Game Name</label>
                    <input name='name' onChange={handleChange} type="text" required />
                </div>
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default CreateName