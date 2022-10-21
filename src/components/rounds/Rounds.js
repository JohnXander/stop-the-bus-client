import { useState } from 'react'
import Cards from '../cards/Cards'
import CreateAnswers from '../create/CreateAnswers'
import './style.css'

const Rounds = ({ rounds, userId, editRound, setEditRound }) => {
    const [roundView, setRoundView] = useState(undefined)
    const [editView, setEditView] = useState(undefined)
    const [cards, setCards] = useState([])

    const displayCards = (idx) => {
        const answers = rounds[idx].answers.join(',').toLowerCase()
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

    const handleHide = () => setRoundView(undefined)
    const handleEdit = (roundId) => setEditView(roundId)

    const handleDelete = (roundId) => {
        fetch(`http://localhost:4000/rounds/${roundId}`, {
            method: 'DELETE'
        })
            .then(_ => setEditRound(!editRound))
    }

    return (
        <div className='rounds'>
            {rounds.length === 0 && <p className='start-note'>Add a new round to start the game...</p>}
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
                                    <Cards
                                        userId={userId}
                                        editView={editView}
                                        setEditView={setEditView}
                                        cards={cards}
                                        round={round}
                                        displayCards={displayCards}
                                        roundIndex={idx}
                                    />
                                </div> :
                                <div
                                    style={{ backgroundColor: '#212529' }}
                                    className='answers'
                                    onClick={() => handleClick(round, idx)}
                                >
                                    {round.answers.length ? round.answers.map((answer, i) => {
                                        return <p key={i}>{answer}</p>
                                    }) :
                                        <CreateAnswers
                                            editRound={editRound}
                                            setEditRound={setEditRound}
                                            round={round}
                                        />}
                                </div>
                        }
                        <div className='round-controls'>
                            {round.id === roundView && cards.length === 3 ?
                                <button onClick={handleHide}>Hide Cards</button> :
                                round.id === roundView && cards.length < 3 ?
                                    <div className='cards-control'>
                                        <button onClick={handleHide}>Hide Cards</button>
                                        <button onClick={() => handleEdit(round.id)}>Edit Cards</button>
                                    </div> :
                                    <button onClick={() => handleDelete(round.id)}>Delete Round</button>}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Rounds