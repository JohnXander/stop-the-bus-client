import { useEffect, useState } from "react"

const Games = () => {
    const [games, setGames] = useState([])

    useEffect(() => {
        fetch('http://localhost:4000/games')
            .then(res => res.json())
            .then(data => setGames(data.games))
    }, [])

    return (
        <>
            <h1>My games</h1>
            {games && games.map(game => <p key={game.id}>{game.name}</p>)}
        </>
    )
}

export default Games