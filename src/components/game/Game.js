import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

const Game = () => {
    const location = useLocation()
    const { id, name } = location.state.game

    const [teams, setTeams] = useState([])

    useEffect(() => {
        if (id !== undefined) {
            fetch(`http://localhost:4000/teams?gameId=${id}`)
                .then(res => res.json())
                .then(data => setTeams(data.teams))
        }
    }, [id])

    return (
        <div>
            <h1>{name}</h1>
            {teams.map(team => {
                return <p key={team.id}>{team.name}: {team.points} pts</p>
            })}
        </div>
    )
}

export default Game