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
                            <p><span>{team.points}</span> pts</p>
                            <i onClick={() => handleClick(team, 'inc')} className="fa-solid fa-circle-plus"></i>
                            <i onClick={() => handleClick(team, 'dec')} className="fa-solid fa-circle-minus"></i>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Teams