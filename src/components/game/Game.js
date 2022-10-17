import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import Teams from "../teams/Teams"
import './style.css'

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
        <>
            <h1>{name}</h1>
            <div className="game">
                <Teams teams={teams} />
                <h1>Rounds</h1>
            </div>
        </>
    )
}

export default Game