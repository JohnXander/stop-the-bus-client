import { useState } from 'react'
import './style.css'

const Rounds = ({ rounds }) => {
    const [roundView, setRoundView] = useState(undefined)
    const [cards, setCards] = useState([])

    const displayCards = (round) => {
        const answers = rounds[round - 1].answers.join(',')
        fetch(`http://localhost:4000/cards?words=${answers}`)
            .then(res => res.json())
            .then(data => setCards(data.cards))
    }

    const handleClick = (round) => {
        setRoundView(round.id)
        displayCards(round.id)
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
                            round.id === roundView && roundView !== undefined ?
                                <div
                                    style={{ backgroundColor: 'grey' }}
                                    className='answers'
                                    onClick={() => handleClick(round)}
                                >
                                    {cards.map(card => {
                                        return (
                                            <div key={card.id} className="card">
                                                <img src={card.imgUrl} alt={card.word} />
                                                <h3>{card.word}</h3>
                                                <p>{card.type}</p>
                                            </div>
                                        )
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