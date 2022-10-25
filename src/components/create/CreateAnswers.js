import { useState } from 'react';
import './style.css'

const CreateAnswers = ({ round, editRound, setEditRound }) => {
    const { id, letter, gameId } = round
    const [formValue, setFormValue] = useState({})

    const handleSubmit = (e) => {
        e.preventDefault()
        const formAnswers = Object.values(formValue).map(val => val.toLowerCase())
        fetch(`http://localhost:4000/rounds/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ letter, answers: formAnswers, gameId }),
        })
            .then(_ => setEditRound(!editRound))
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValue((prevState) => {
            return {
                ...prevState,
                [name]: value,
            }
        })
    }

    return (
        <form onSubmit={handleSubmit} className='answer-form-container'>
            <div className='answer-forms'>
                <input
                    className='form-input'
                    placeholder='Answer 1...'
                    name='word1'
                    onChange={handleChange}
                    type="text"
                    required
                />
                <input
                    className='form-input'
                    placeholder='Answer 2...'
                    name='word2'
                    onChange={handleChange}
                    type="text"
                    required
                />
                <input
                    className='form-input'
                    placeholder='Answer 3...'
                    name='word3'
                    onChange={handleChange}
                    type="text"
                    required
                />
            </div>
            <div className='btn-container'>
                <button className='create-btn' type='submit'>Submit Answers</button>
            </div>
        </form>
    )
}

export default CreateAnswers