import './style.css'

const Teams = ({ teams, editTeam, setEditTeam, completed }) => {
    teams.sort((a, b) => a.name.localeCompare(b.name))
    const winningPoints = Math.max(...teams.map(team => team.points))

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
            .then(_ => setEditTeam(!editTeam))
    }

    return (
        <div className='teams'>
            {teams.map(team => {
                return (
                    <div className='team' key={team.id}>
                        <h3>
                            {team.name}
                            {completed && team.points === winningPoints && <span> 🎉</span>}
                        </h3>
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