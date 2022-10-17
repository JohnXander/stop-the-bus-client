import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import './style.css'

const Games = ({ user }) => {
    const [games, setGames] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        if (user.id !== undefined) {
            fetch(`http://localhost:4000/games?userId=${user.id}`)
                .then(res => res.json())
                .then(data => setGames(data.games))
        }
    }, [user.id])

    const handleClick = (game) => navigate(`/games/${game.id}`, { state: { game } })

    return (
        <>
            <h1>My games</h1>
            {games && games.map(game => {
                return (
                    <p
                        className="game"
                        key={game.id}
                        onClick={() => handleClick(game)}
                    >
                        {game.name}
                    </p>
                )
            })}
        </>
    )
}

export default Games