import './style.css'

const Rounds = ({ rounds }) => {
    return (
        <div className='rounds'>
            {rounds.map(round => {
                return <p key={round.id}>{round.letter}</p>
            })}
        </div>
    )
}

export default Rounds