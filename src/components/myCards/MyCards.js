import { useEffect, useState } from "react"
import './style.css'

const MyCards = ({ user }) => {
    const [cards, setCards] = useState([])

    useEffect(() => {
        if (user.id !== undefined) {
            fetch(`http://localhost:4000/cards?userId=${user.id}`)
                .then(res => res.json())
                .then(data => setCards(data.cards))
        }
    }, [user.id])

    return (
        <div className="wide-container">
            <h1 className="cards-title">My cards</h1>
            <div className="card-list">
                {cards && cards.map(card => {
                    const cardWord = card.word[0].toUpperCase() + card.word.substring(1)
                    return (
                        <div key={card.id} className="card">
                            <div className='img-container'>
                                <img
                                    src={card.imgUrl}
                                    alt={card.imgUrl.length ? card.imgUrl : 'not selected'}
                                />
                            </div>
                            <h3>{cardWord}</h3>
                            <p>{card.type}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default MyCards