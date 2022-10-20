import { useState } from 'react'
import Cards from '../cards/Cards'
import CreateAnswers from '../create/CreateAnswers'
import './style.css'

const Rounds = ({ rounds, updateRound, setUpdateRound, deleteRound, setDeleteRound }) => {
    const [roundView, setRoundView] = useState(undefined)
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

    const handleEdit = () => {
        console.log('edit')
    }

    const handleDelete = (roundId) => {
        fetch(`http://localhost:4000/rounds/${roundId}`, {
            method: 'DELETE'
        })
            .then(_ => setDeleteRound(!deleteRound))
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
                                    <Cards cards={cards} round={round} />
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
                                            updateRound={updateRound}
                                            setUpdateRound={setUpdateRound}
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
                                        <button onClick={handleEdit}>Edit Cards</button>
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