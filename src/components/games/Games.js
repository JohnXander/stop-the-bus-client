import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import './style.css'

const Games = ({ user }) => {
    const [games, setGames] = useState([])
    const [deleteItem, setDeleteItem] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        if (user.id !== undefined) {
            fetch(`http://localhost:4000/games?userId=${user.id}`)
                .then(res => res.json())
                .then(data => setGames(data.games))
        }
    }, [user.id, deleteItem])

    const handleNavigate = (game) => navigate(`/games/${game.id}`, { state: { game } })

    const handleDelete = (game) => {
        fetch(`http://localhost:4000/games/${game.id}`, {
            method: 'DELETE'
        }).then(_ => setDeleteItem(!deleteItem))
    }

    return (
        <>
            <h1>My games</h1>
            {games && games.map(game => {
                return (
                    <div className="game-container" key={game.id}>
                        <p
                            className="game"
                            onClick={() => handleNavigate(game)}
                        >
                            {game.name}
                        </p>
                        <button onClick={() => handleDelete(game)}>Delete</button>
                    </div>
                )
            })}
        </>
    )
}

export default Games