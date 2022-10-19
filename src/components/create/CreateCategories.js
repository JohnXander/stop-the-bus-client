import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

const CreateCategories = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const game = location.state.gameData
    const gameName = location.state.gameData.name
    const gameId = location.state.gameData.id
    const gameTeams = location.state.data.createdTeams
    const [formValue, setFormValue] = useState({})

    const handleSubmit = (e) => {
        e.preventDefault()
        const categoryNames = Object.values(formValue)
        fetch('http://localhost:4000/categories', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ categories: categoryNames, gameId: +gameId }),
        })
            .then(_ => navigate(`/games/${gameId}`, { state: { game } }))
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
        <div className="form-container">
            <form onSubmit={handleSubmit} className='game-form'>
                <h3>Categories</h3>
                <div>
                    <label>Category</label>
                    <input name='category1' onChange={handleChange} type="text" required />
                </div>
                <div>
                    <label>Category</label>
                    <input name='category2' onChange={handleChange} type="text" required />
                </div>
                <div>
                    <label>Category</label>
                    <input name='category3' onChange={handleChange} type="text" required />
                </div>
                <button type='submit'>Start Game</button>
            </form>
            <div className="game-preview">
                <h2>Game Details</h2>
                <h3>Name:</h3>
                <p>{gameName}</p>
                <div>
                    <h3>Teams:</h3>
                    {gameTeams.map((team, i) => {
                        return (
                            i !== gameTeams.length - 1 ?
                                <span key={i}>{team.name}, </span> :
                                <span key={i}>{team.name}</span>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default CreateCategories