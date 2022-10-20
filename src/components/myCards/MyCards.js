import { useEffect, useState } from "react"
import './style.css'

const MyCards = ({ user }) => {
    const [cards, setCards] = useState([])

    useEffect(() => {
        if (user.id !== undefined) {
            fetch("http://localhost:4000/cards")
                .then(res => res.json())
                .then(data => setCards(data.cards))
        }
    }, [user.id])

    return (
        <div>
            <h1>My cards</h1>
            {/* <button onClick={() => handleNavigate('CREATE')}>Create New Game</button> */}
            <div className="card-list">
                {cards && cards.map(card => {
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
        </div>
    )
}

export default MyCards