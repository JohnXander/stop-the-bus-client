import './style.css'

const Cards = ({ cards, round }) => {
    const { answers } = round
    const allCards = answers.map(answer => {
        const found = cards.find(card => card.word === answer)
        return found || { word: answer, type: 'none selected' }
    })

    return (
        allCards.map(card => {
            return (
                <div key={card.id} className="card">
                    <div className='img-container'>
                        <img src={card.imgUrl} alt='none selected' />
                    </div>
                    <h3>{card.word}</h3>
                    <p>{card.type}</p>
                </div>
            )
        })
    )
}

export default Cards