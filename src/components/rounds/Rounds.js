import { useState } from 'react'
import './style.css'

const Rounds = ({ rounds }) => {
    const [roundView, setRoundView] = useState(1)

    const handleClick = (round) => {
        setRoundView(round.id)
    }

    return (
        <div className='rounds'>
            {rounds.map(round => {
                return (
                    <div
                        className="round"
                    >
                        <p key={round.id}>{round.letter}</p>
                        {
                            round.id === roundView ?
                                <div
                                    style={{ backgroundColor: 'grey' }}
                                    className='answers'
                                    onClick={() => handleClick(round)}
                                >
                                    {round.answers.map((answer, i) => {
                                        return <p key={i}>{answer} card</p>
                                    })}
                                </div> :
                                <div
                                    style={{ backgroundColor: '#212529' }}
                                    className='answers'
                                    onClick={() => handleClick(round)}
                                >
                                    {round.answers.map((answer, i) => {
                                        return <p key={i}>{answer}</p>
                                    })}
                                </div>
                        }
                    </div>
                )
            })}
        </div>
    )
}

export default Rounds