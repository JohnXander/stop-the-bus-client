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

    const handleEdit = (roundId) => {
        if (editView === roundId) {
            setEditView(undefined)
        } else {
            setEditView(roundId)
        }
    }

    const handleDelete = (roundId) => {
        fetch(`http://localhost:4000/rounds/${roundId}`, {
            method: 'DELETE'
        })
            .then(_ => setEditRound(!editRound))
    }

    return (
        <div className='rounds'>
            {rounds.length === 0 && <p className='start-note'>Add a new round to start the game.</p>}
            {rounds.map((round, idx) => {
                return (
                    <div key={round.id} className="round">
                        <p>{round.letter}</p>
                        {
                            round.id === roundView && roundView !== undefined ?
                                <div
                                    style={{ backgroundColor: '#E5E5E5' }}
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
                                    style={{ backgroundColor: '#fff' }}
                                    className='answers'
                                    onClick={() => handleClick(round, idx)}
                                >
                                    {round.answers.length ? round.answers.map((answer, i) => {
                                        const wordAnswer = answer[0].toUpperCase() + answer.substring(1)
                                        return <p key={i}>{wordAnswer}</p>
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
                                <i
                                    onClick={handleHide}
                                    class="fa-solid fa-eye-slash check-btn">
                                </i> :
                                round.id === roundView && cards.length < 3 ?
                                    <div className='cards-control'>
                                        <i
                                            onClick={handleHide}
                                            className="fa-solid fa-eye-slash check-btn">
                                        </i>
                                        <i
                                            onClick={() => handleEdit(round.id)}
                                            className="fa-solid fa-pen-to-square edit-btn">
                                        </i>
                                    </div> :
                                    <i
                                        onClick={() => handleDelete(round.id)}
                                        className="fa-solid fa-trash-can delete-btn">
                                    </i>
                            }
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Rounds