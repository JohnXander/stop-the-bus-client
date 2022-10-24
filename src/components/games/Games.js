import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import './style.css'

const Games = ({ user }) => {
    const [games, setGames] = useState([])
    const [editGameList, setEditGameList] = useState(true)
    const [editNameView, setEditNameView] = useState(undefined)
    const navigate = useNavigate()

    games.sort((a, b) => a.name.localeCompare(b.name))

    useEffect(() => {
        if (user.id !== undefined) {
            fetch(`http://localhost:4000/games?userId=${user.id}`)
                .then(res => res.json())
                .then(data => setGames(data.games))
        }
    }, [user.id, editGameList])

    const handleNavigate = (game) => {
        if (game === 'CREATE') {
            navigate('/create/name', { state: { user } })
        } else {
            navigate(`/games/${game.id}`, { state: { game } })
        }
    }

    const handleDelete = (game) => {
        fetch(`http://localhost:4000/games/${game.id}`, {
            method: 'DELETE'
        })
            .then(_ => setEditGameList(!editGameList))
    }

    const handleEdit = (game) => setEditNameView(game.id)

    const handleComplete = (game) => {
        const { name, id, completed } = game
        const userId = user.id
        const newCompleted = !completed

        fetch(`http://localhost:4000/games/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, userId, completed: newCompleted }),
        })
            .then(_ => setEditGameList(!editGameList))
    }

    return (
        <div className="container">
            <div className="games-header">
                <h2 className="page-title">My Games</h2>
                <button
                    className="create-btn"
                    onClick={() => handleNavigate('CREATE')}
                >
                    <i class="fa-solid fa-circle-plus"></i>
                    CREATE NEW GAME
                </button>
            </div>
            {games && games.map(game => {
                return (
                    <div>
                        <div className="game-container" key={game.id}>
                            <p
                                className="game-item"
                                onClick={() => handleNavigate(game)}
                            >
                                {game.name}
                            </p>
                            {
                                game.completed ?
                                    <i
                                        onClick={() => handleComplete(game)}
                                        className="fa-solid fa-square-check check-btn">
                                    </i> :
                                    <i
                                        onClick={() => handleComplete(game)}
                                        className="fa-regular fa-square-check check-btn">
                                    </i>
                            }
                            <i
                                onClick={() => handleEdit(game)}
                                className="fa-solid fa-pen-to-square edit-btn">
                            </i>
                            <i
                                onClick={() => handleDelete(game)}
                                className="fa-solid fa-trash-can delete-btn"
                            ></i>
                        </div>
                        {editNameView === game.id && <p>Edit Form Component</p>}
                    </div>
                )
            })}
        </div>
    )
}

export default Games