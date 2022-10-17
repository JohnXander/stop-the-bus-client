import './style.css'

const Teams = ({ teams }) => {
    return (
        <div className='teams'>
            {teams.map(team => {
                return (
                    <div key={team.id}>
                        <h3>{team.name}</h3>
                        <div className="players">
                            {team.players.map(player => {
                                return <p>{player},</p>
                            })}
                        </div>
                        <p>{team.points} pts</p>
                    </div>
                )
            })}
        </div>
    )
}

export default Teams