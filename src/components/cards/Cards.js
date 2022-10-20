import { useState } from 'react'
import './style.css'

const Cards = ({ cards, round, editView, setEditView }) => {
    const { id, answers } = round
    const [formValue, setFormValue] = useState({})

    console.log(formValue)

    const allCards = answers.map((answer) => {
        const found = cards.find(card => card.word === answer)
        return found || { word: answer, type: 'not selected', imgUrl: '' }
    })

    const handleSubmit = (event) => {
        event.preventDefault()
        const state = {}
        for (let i = 0; i < event.target.length; i++) {
            const input = event.target[i]
            state[input.name] = input.value
        }
        setFormValue(state)
        // setEditView(undefined)
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValue((prevState) => {
            return {
                ...prevState,
                [name]: value,
            }
        })
    };

    return (
        editView === id && editView !== undefined ?
            <form onSubmit={handleSubmit} className='edit-card-form'>
                <h3>Edit Cards</h3>
                <div className='edit-cards'>
                    {allCards.map((card, i) => {
                        return (
                            <div key={i} className="edit-card">
                                <label>Image URL:</label>
                                <input
                                    name={`imgUrl${i + 1}`}
                                    type="text"
                                    defaultValue={card.imgUrl === '' ? '' : card.imgUrl}
                                    onChange={handleChange}
                                    required
                                />
                                <label>Word:</label>
                                <input
                                    name={`word${i + 1}`}
                                    type="text"
                                    defaultValue={card.word}
                                    onChange={handleChange}
                                    required
                                />
                                <label>Word Type:</label>
                                <input
                                    name={`type${i + 1}`}
                                    type="text"
                                    defaultValue={card.type === 'not selected' ? '' : card.type}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )
                    })}
                </div>
                <button type='submit'>Submit Cards</button>
            </form> :
            allCards.map(card => {
                return (
                    <div key={card.id} className="card">
                        <div className='img-container'>
                            <img
                                src={card.imgUrl}
                                alt={card.imgUrl.length ? card.imgUrl : 'not selected'}
                            />
                        </div>
                        <h3>{card.word}</h3>
                        <p>{card.type}</p>
                    </div>
                )
            })
    )
}

export default Cards