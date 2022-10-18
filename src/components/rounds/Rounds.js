import './style.css'

const Rounds = ({ rounds }) => {
    return (
        <div className='rounds'>
            {rounds.map(round => {
                return (
                    <div className="round">
                        <p key={round.id}>{round.letter}</p>
                        <div className='answers'>
                            {round.answers.map((answer, i) => {
                                return <p key={i}>{answer}</p>
                            })}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Rounds