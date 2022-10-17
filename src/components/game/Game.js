import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import Categories from "../categories/Categories"
import Teams from "../teams/Teams"
import './style.css'

const Game = () => {
    const location = useLocation()
    const { id, name } = location.state.game

    const [teams, setTeams] = useState([])
    const [categories, setCategories] = useState([])

    useEffect(() => {
        if (id !== undefined) {
            fetch(`http://localhost:4000/teams?gameId=${id}`)
                .then(res => res.json())
                .then(data => setTeams(data.teams))
        }
    }, [id])

    useEffect(() => {
        if (id !== undefined) {
            fetch(`http://localhost:4000/categories?gameId=${id}`)
                .then(res => res.json())
                .then(data => setCategories(data.categories))
        }
    }, [id])

    return (
        <>
            <h1>{name}</h1>
            <div className="game">
                <Teams teams={teams} />
                <div>
                    <Categories categories={categories} />
                    <h1>Rounds</h1>
                </div>
            </div>
        </>
    )
}

export default Game