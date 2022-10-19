import { useState } from 'react'
import CreateAnswers from '../create/CreateAnswers'
import './style.css'

const Rounds = ({ rounds, updateRound, setUpdateRound }) => {
    const [roundView, setRoundView] = useState(undefined)
    const [cards, setCards] = useState([])

    const displayCards = (idx) => {
        const answers = rounds[idx].answers.join(',')
        fetch(`http://localhost:4000/cards?words=${answers}`)
            .then(res => res.json())
            .then(data => setCards(data.cards))
    }

    const handleClick = (round, idx) => {
        if (round.answers.length) {
            setRoundView(round.id)
            displayCards(idx)
        }
    }

    return (
        <div className='rounds'>
            {rounds.map((round, idx) => {
                return (
                    <div key={round.id} className="round">
                        <p>{round.letter}</p>
                        {
                            round.id === roundView && roundView !== undefined ?
                                <div
                                    style={{ backgroundColor: 'grey' }}
                                    className='answers'
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
                                    onClick={() => handleClick(round, idx)}
                                >
                                    {round.answers.length ? round.answers.map((answer, i) => {
                                        return <p key={i}>{answer}</p>
                                    }) : <CreateAnswers updateRound={updateRound} setUpdateRound={setUpdateRound} round={round} />}
                                </div>
                        }
                    </div>
                )
            })}
        </div>
    )
}

export default Rounds