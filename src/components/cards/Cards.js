import CreateCard from '../create/CreateCard'
import './style.css'

const Cards = ({ cards, round, editView, setEditView, editCard, setEditCard, setRoundView, userId }) => {
    const { id, answers } = round

    const allCards = answers.map((answer) => {
        const found = cards.find(card => card.word === answer)
        return found || { word: answer, type: 'not selected', imgUrl: '' }
    })

    return (
        <div>
            <div className='answers'>
                {allCards.map(card => {
                    return (
                        <div key={card.id} className="card">
                            <div className='img-container'>
                                <img
                                    src={card.imgUrl}
                                    alt={card.imgUrl.length ? card.imgUrl : 'not selected'}
                                />
                            </div>
                            <h3>{card.word}</h3>
                            <p>{card.type}</p>
                        </div>
                    )
                })}
            </div>
            {editView === id && <CreateCard
                userId={userId}
                editCard={editCard}
                setEditCard={setEditCard}
                setEditView={setEditView}
                setRoundView={setRoundView}
            />}
        </div>

    )
}

export default Cards