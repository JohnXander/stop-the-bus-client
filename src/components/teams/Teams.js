import './style.css'

const Teams = ({ teams, updateTeam, setUpdateTeam }) => {

    const handleClick = (team, dir) => {
        const { id, name, points, gameId } = team
        let newPoints

        if (dir === 'inc') newPoints = points + 1
        if (dir === 'dec') newPoints = points - 1

        fetch(`http://localhost:4000/teams/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, points: newPoints, gameId }),
        })
            .then(_ => setUpdateTeam(!updateTeam))
    }

    return (
        <div className='teams'>
            {teams.map(team => {
                return (
                    <div className='team' key={team.id}>
                        <h3>{team.name}</h3>
                        <div className='points'>
                            <p>{team.points} pts</p>
                            <button onClick={() => handleClick(team, 'inc')}>+</button>
                            <button onClick={() => handleClick(team, 'dec')}>-</button>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Teams