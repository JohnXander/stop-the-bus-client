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
            body: JSON.stringify({ name, completed: false, userId: +userId }),
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
        <div className='game-form-container'>
            <div className='create-progress'>
                <i style={{ color: '#1FC2FF' }} className="fa-solid fa-1"></i>
                <i className="fa-solid fa-2"></i>
                <i className="fa-solid fa-3"></i>
            </div>
            <form onSubmit={handleSubmit} className='game-form'>
                <h3>Create New Game</h3>
                <input
                    className="form-input"
                    placeholder={'Game name...'}
                    name='name'
                    onChange={handleChange}
                    type="text"
                    required
                />
                <button className='create-btn' type='submit'>Submit Name</button>
            </form>
        </div>
    )
}

export default CreateName