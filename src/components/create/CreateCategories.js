import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import Header from "../header/Header"

const CreateCategories = ({ user }) => {
    const location = useLocation()
    const navigate = useNavigate()
    const game = location.state.gameData
    const gameName = location.state.gameData.name
    const formattedGameName = gameName[0].toUpperCase() + gameName.substring(1)
    const gameId = location.state.gameData.id
    const gameTeams = location.state.data.createdTeams
    const formattedTeamNames = gameTeams.map(team => {
        return team.name[0].toUpperCase() + team.name.substring(1)
    })


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
        <>
            <Header user={user} />
            <div className="game-form-container">
                <div className='create-progress'>
                    <i className="fa-solid fa-1"></i>
                    <i className="fa-solid fa-2"></i>
                    <i style={{ color: '#1FC2FF' }} className="fa-solid fa-3"></i>
                </div>
                <form onSubmit={handleSubmit} className='game-form'>
                    <h3>Categories</h3>
                    <input
                        className="form-input"
                        placeholder="Category 1..."
                        name='category1'
                        onChange={handleChange}
                        type="text"
                        required
                    />
                    <input
                        className="form-input"
                        placeholder="Category 2..."
                        name='category2'
                        onChange={handleChange}
                        type="text"
                        required
                    />
                    <input
                        className="form-input"
                        placeholder="Category 3..."
                        name='category3'
                        onChange={handleChange}
                        type="text"
                        required
                    />
                    <button className="create-btn" type='submit'>Start Game</button>
                </form>
                <div className="game-preview">
                    <div className="game-name-preview">
                        <i className="fa-solid fa-chalkboard"></i>
                        {formattedGameName}
                    </div>
                    <div className="game-name-preview">
                        <i className="fa-solid fa-user-group"></i>
                        {formattedTeamNames.map((team, i) => {
                            return (
                                i !== gameTeams.length - 1 ?
                                    <span key={i}>{team}, </span> :
                                    <span key={i}>{team}</span>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default CreateCategories