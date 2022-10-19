import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

const CreateTeams = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const gameData = location.state.data.game
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
            .then(_ => navigate('/create/categories', { state: { gameData } }))
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

    const handleClick = () => {
        setTeams(oldArray => [...oldArray, `team${teams.length + 1}`]);
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className='game-form'>
                <h3>Teams</h3>
                {teams.map((team, i) => {
                    return (
                        <div key={i}>
                            <label>Team Name</label>
                            <input name={team} onChange={handleChange} type="text" required />
                        </div>
                    )
                })}
                <button onClick={handleClick}>Add another team</button>
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default CreateTeams