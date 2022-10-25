import { useState } from "react"

const CreateCard = ({ userId, displayCards, roundIndex, setEditView }) => {
    const [formValue, setFormValue] = useState({ userId: +userId })

    const handleSubmit = (e) => {
        e.preventDefault()

        formValue.word = formValue.word.toLowerCase()
        formValue.type = formValue.type.toLowerCase()

        fetch('http://localhost:4000/cards', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formValue),
        })
            .then(_ => {
                displayCards(roundIndex)
                setEditView(undefined)
            })
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
        <div className="create-card-container">
            <form className="game-form gamplay-form" onSubmit={handleSubmit}>
                <h3>Add a card to the database:</h3>
                <input
                    className="form-input"
                    placeholder="Image URL..."
                    onChange={handleChange}
                    name="imgUrl"
                    type="text"
                    required
                />
                <input
                    className="form-input"
                    placeholder="Word..."
                    onChange={handleChange}
                    name="word"
                    type="text"
                    required
                />
                <input
                    className="form-input"
                    placeholder="Word Type..."
                    onChange={handleChange}
                    name="type"
                    type="text"
                    required
                />
                <button className="create-btn" type="submit">Submit Card</button>
            </form>
        </div>
    )
}

export default CreateCard