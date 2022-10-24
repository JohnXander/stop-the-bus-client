import { useState } from "react"

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
        <form onSubmit={handleSubmit}>
            <label>Game Name</label>
            <input name="name" onChange={handleChange} type="text" />
            <button type="submit">Submit Name</button>
        </form>
    )
}

export default EditGame