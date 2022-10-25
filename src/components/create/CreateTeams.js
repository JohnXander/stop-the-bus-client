import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import Header from "../header/Header"

const CreateTeams = ({ user }) => {
    const location = useLocation()
    const navigate = useNavigate()
    const gameData = location.state.data.game
    const gameName = gameData.name
    const gameId = gameData.id

    const [formValue, setFormValue] = useState({})
    const [teams, setTeams] = useState(['team1', 'team2'])

    const handleSubmit = (e) => {
        e.preventDefault()
        const teamNames = Object.values(formValue)
        fetch('http://localhost:4000/teams', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ teams: teamNames, gameId: +gameId }),
        })
            .then(res => res.json())
            .then(data => navigate('/create/categories', { state: { gameData, data } }))
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

    const handleClick = (dir) => {
        const teamLength = teams.length
        const incRange = teamLength >= 2 && teamLength < 4
        const decRange = teamLength > 2 && teamLength <= 4
        console.log(teamLength > 2)
        if (dir === 'INC' && incRange) {
            setTeams(oldArray => [...oldArray, `team${teams.length + 1}`])
        } else if (dir === 'DEC' && decRange) {
            setTeams(oldArray => oldArray.filter((_, i) => {
                return i !== (teamLength - 1)
            }))
        }
    }

    return (
        <>
            <Header user={user} />
            <div className="game-form-container">
                <div className='create-progress'>
                    <i className="fa-solid fa-1"></i>
                    <i style={{ color: '#1FC2FF' }} className="fa-solid fa-2"></i>
                    <i className="fa-solid fa-3"></i>
                </div>
                <form onSubmit={handleSubmit} className='game-form'>
                    <h3>Teams</h3>
                    {teams.map((team, i) => {
                        return (
                            <input
                                key={i}
                                className="form-input"
                                placeholder="Team Name..."
                                name={team}
                                onChange={handleChange}
                                type="text"
                                required
                            />
                        )
                    })}
                    <div className="teams-amount">
                        <i onClick={() => handleClick('INC')} className="fa-solid fa-circle-plus"></i>
                        <i onClick={() => handleClick('DEC')} className="fa-solid fa-circle-minus"></i>
                    </div>
                    <button className="create-btn" type='submit'>Submit Teams</button>
                </form>
                <div className="game-preview">
                    <div className="game-name-preview">
                        <i className="fa-solid fa-chalkboard"></i>
                        {gameName}
                    </div>
                </div>
            </div>
        </>
    )
}

export default CreateTeams