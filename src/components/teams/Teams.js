import './style.css'

const Teams = ({ teams }) => {
    return (
        <div className='teams'>
            {teams.map(team => {
                return (
                    <div className='team' key={team.id}>
                        <h3>{team.name}</h3>
                        <p className='points'>{team.points} pts</p>
                    </div>
                )
            })}
        </div>
    )
}

export default Teams