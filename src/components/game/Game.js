import { useLocation } from "react-router-dom"

const Game = () => {
    const location = useLocation()
    const { id, name } = location.state.game

    return (
        <div>{name} {id}</div>
    )
}

export default Game