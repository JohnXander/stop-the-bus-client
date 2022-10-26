import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import EditGame from "../edit/EditGame"
import Header from "../header/Header"
import './style.css'

const Games = ({ user }) => {
    const location = useLocation()
    const [games, setGames] = useState([])
    const [editGameList, setEditGameList] = useState(true)
    const [editNameView, setEditNameView] = useState(undefined)
    const navigate = useNavigate()
    const pageNav = location.state

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

    const handleEdit = (game) => {
        if (editNameView !== game.id) {
            setEditNameView(game.id)
        } else {
            setEditNameView(undefined)
        }
    }

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
        <>
            <Header user={user} pageNav={pageNav} />
            <div className="container">
                <div className="games-header">
                    <h1>My Games</h1>
                    <button
                        className="create-btn"
                        onClick={() => handleNavigate('CREATE')}
                    >
                        <i className="fa-solid fa-circle-plus"></i>
                        CREATE NEW GAME
                    </button>
                    {games.length === 0 && <p className='no-games'>You don't have any games yet.</p>}
                </div>
                {games && games.map(game => {
                    const dateParts = String(new Date(user.createdAt)).split(' ')
                    const formattedGameName = game.name[0].toUpperCase() + game.name.substring(1)
                    return (
                        <div key={game.id}>
                            <div className="game-container">
                                <h3
                                    className="game-item"
                                    onClick={() => handleNavigate(game)}
                                >
                                    {formattedGameName}
                                </h3>
                                <p>Created {dateParts[1]} {dateParts[3]}</p>
                                <div className="game-list-controls">
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
                                        className="fa-solid fa-trash-can delete-btn">
                                    </i>
                                </div>
                                {editNameView === game.id &&
                                    <EditGame
                                        game={game}
                                        setEditNameView={setEditNameView}
                                        editGameList={editGameList}
                                        setEditGameList={setEditGameList}
                                    />}
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default Games