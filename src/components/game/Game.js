import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import Categories from "../categories/Categories"
import Header from "../header/Header"
import Rounds from "../rounds/Rounds"
import Teams from "../teams/Teams"
import './style.css'

const Game = ({ user }) => {
    const location = useLocation()
    const { id, name, completed, userId } = location.state.game
    const [formValue, setFormValue] = useState({})

    const [teams, setTeams] = useState([])
    const [categories, setCategories] = useState([])
    const [rounds, setRounds] = useState([])

    const [editRound, setEditRound] = useState(true)
    const [editTeam, setEditTeam] = useState(true)

    useEffect(() => {
        if (id !== undefined) {
            fetch(`http://localhost:4000/teams?gameId=${id}`)
                .then(res => res.json())
                .then(data => setTeams(data.teams))

            fetch(`http://localhost:4000/categories?gameId=${id}`)
                .then(res => res.json())
                .then(data => setCategories(data.categories))

            fetch(`http://localhost:4000/rounds?gameId=${id}`)
                .then(res => res.json())
                .then(data => setRounds(data.rounds))
        }
    }, [id, editRound, editTeam])

    const handleSubmit = (e) => {
        e.preventDefault()
        const capitalLetter = formValue.round.toUpperCase()

        fetch('http://localhost:4000/rounds', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ letter: capitalLetter, answers: [], gameId: +id }),
        })
            .then(_ => setEditRound(!editRound))
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
            <div className="gameplay-container">
                <div className="game-header">
                    <h1 className="game-name">{name}</h1>
                    {completed ? <p>Completed!</p> : <p>In progress...</p>}
                </div>
                <div className="game">
                    <Teams
                        editTeam={editTeam}
                        setEditTeam={setEditTeam}
                        teams={teams}
                        completed={completed}
                    />
                    <div>
                        <Categories categories={categories} />
                        <Rounds
                            userId={userId}
                            editRound={editRound}
                            setEditRound={setEditRound}
                            rounds={rounds}
                        />
                        <form className="add-round" onSubmit={handleSubmit}>
                            <input
                                className="form-input"
                                placeholder="New round..."
                                name='round'
                                onChange={handleChange}
                                type="text"
                                maxLength={1}
                                required
                            />
                            <button className="create-btn" type="submit">Submit Round</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Game