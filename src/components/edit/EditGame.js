import { useState } from "react"
import './style.css'

const EditGame = ({ game, setEditNameView, editGameList, setEditGameList }) => {
    const [formValue, setFormValue] = useState({})

    const handleSubmit = (e) => {
        e.preventDefault()
        const { name } = formValue
        fetch(`http://localhost:4000/games/${game.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name }),
        })
            .then(_ => {
                setEditNameView(undefined)
                setEditGameList(!editGameList)
            })
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormValue((prevName) => {
            return {
                ...prevName,
                [name]: value
            }
        })
    }

    return (
        <form className="edit-game-form" onSubmit={handleSubmit}>
            <input
                className="form-input"
                name="name"
                onChange={handleChange}
                type="text"
                placeholder={'New game name...'}
            />
            <button type="submit" className="create-btn">SUBMIT NAME</button>
        </form>
    )
}

export default EditGame