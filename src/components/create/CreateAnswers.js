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
            <p>Answers:</p>
            <div className='answer-forms'>
                <div className='answer-form'>
                    <input name='word1' onChange={handleChange} type="text" required />
                </div>
                <div className='answer-form'>
                    <input name='word2' onChange={handleChange} type="text" required />
                </div>
                <div className='answer-form'>
                    <input name='word3' onChange={handleChange} type="text" required />
                </div>
            </div>
            <button type='submit'>Submit Answers</button>
        </form>
    )
}

export default CreateAnswers