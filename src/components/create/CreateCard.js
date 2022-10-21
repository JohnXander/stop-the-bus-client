import { useState } from "react"

const CreateCard = ({ editCard, setEditCard, setEditView, setRoundView, userId }) => {
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
                setEditCard(!editCard)
                setEditView(undefined)
                setRoundView(undefined)
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
        <div>
            <h3>Add your card to the database:</h3>
            <form onSubmit={handleSubmit}>
                <label>Image URL</label>
                <input onChange={handleChange} name="imgUrl" type="text" />
                <label>Word</label>
                <input onChange={handleChange} name="word" type="text" />
                <label>Type</label>
                <input onChange={handleChange} name="type" type="text" />
                <button type="submit">Submit Card</button>
            </form>
        </div>
    )
}

export default CreateCard