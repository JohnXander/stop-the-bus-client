import { useEffect, useState } from "react"
import './style.css'

const MyCards = ({ user }) => {
    const [cards, setCards] = useState([])
    const [sortCategory, setSortCategory] = useState('NEW')

    useEffect(() => {
        if (user.id !== undefined) {
            fetch(`http://localhost:4000/cards?userId=${user.id}`)
                .then(res => res.json())
                .then(data => {
                    if (sortCategory === 'OLD') {
                        setCards(data.cards)
                    } else if (sortCategory === 'ABC') {
                        setCards(data.cards.sort((a, b) => a.word.localeCompare(b.word)))
                    } else {
                        setCards(data.cards.reverse())
                    }
                })
        }
    }, [user.id, sortCategory])

    return (
        <div className="wide-container">
            <h1 className="cards-title">My cards</h1>
            <div className="sort-container">
                <h4>SORT BY:</h4>
                <p
                    className={sortCategory === 'NEW' ? 'active-category' : 'category'}
                    onClick={() => setSortCategory('NEW')}
                >
                    Newest
                </p>
                <p
                    className={sortCategory === 'OLD' ? 'active-category' : 'category'}
                    onClick={() => setSortCategory('OLD')}
                >
                    Oldest
                </p>
                <p
                    className={sortCategory === 'ABC' ? 'active-category' : 'category'}
                    onClick={() => setSortCategory('ABC')}
                >
                    Alphabetical Order
                </p>
            </div>
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