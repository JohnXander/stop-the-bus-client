import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import Categories from "../categories/Categories"
import Rounds from "../rounds/Rounds"
import Teams from "../teams/Teams"
import './style.css'

const Game = () => {
    const location = useLocation()
    const { id, name } = location.state.game
    const [formValue, setFormValue] = useState({})

    const [teams, setTeams] = useState([])
    const [categories, setCategories] = useState([])
    const [rounds, setRounds] = useState([])
    const [addRound, setAddRound] = useState(true)
    const [updateRound, setUpdateRound] = useState(true)
    const [updateTeam, setUpdateTeam] = useState(true)

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
    }, [id, addRound, updateRound, updateTeam])

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch('http://localhost:4000/rounds', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ letter: formValue.round, answers: [], gameId: +id }),
        })
            .then(_ => setAddRound(!addRound))
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

    return (
        <div>
            <h1>{name}</h1>
            <div className="game">
                <Teams updateTeam={updateTeam} setUpdateTeam={setUpdateTeam} teams={teams} />
                <div>
                    <Categories categories={categories} />
                    <Rounds updateRound={updateRound} setUpdateRound={setUpdateRound} rounds={rounds} />
                    <form className="add-round" onSubmit={handleSubmit}>
                        <label>Add New Round:</label>
                        <input name='round' onChange={handleChange} type="text" required />
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Game