import './style.css'

const Teams = ({ teams }) => {
    return (
        <div className='teams'>
            {teams.map(team => {
                return (
                    <div className='team' key={team.id}>
                        <h3>{team.name}</h3>
                        <div className="players">
                            ({team.players.map((player, i) => {
                                return (
                                    i !== 2 ?
                                        <p className='player' key={i}>{player},</p> :
                                        <p className='player' key={i}>{player}</p>
                                )
                            })})
                        </div>
                        <p className='points'>{team.points} pts</p>
                    </div>
                )
            })}
        </div>
    )
}

export default Teams