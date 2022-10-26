import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import Header from "../header/Header"
import './style.css'

const MyCards = ({ user }) => {
    const location = useLocation()
    const [cards, setCards] = useState([])
    const [sortCategory, setSortCategory] = useState('NEW')
    const [editCardView, setEditCardView] = useState(false)
    const [runFunction, setRunFunction] = useState(undefined)
    const [editCards, setEditCards] = useState(false)
    const [formValue, setFormValue] = useState({ userId: +user.id })
    const pageNav = location.state

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
    }, [user.id, sortCategory, editCardView, editCards])

    const handleClick = () => setEditCardView(!editCardView)

    const handleSubmit = (e) => {
        e.preventDefault()

        formValue.word = formValue.word.toLowerCase()
        formValue.type = formValue.type.toLowerCase()

        fetch('http://localhost:4000/cards', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formValue),
        })
            .then(_ => setEditCardView(!editCardView))
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormValue((prevState) => {
            return {
                ...prevState,
                [name]: value,
            }
        })
    }

    const handleDelete = (cardId) => setRunFunction(cardId)

    const handleConfirmDelete = (cardId) => {
        fetch(`http://localhost:4000/cards/${cardId}`, {
            method: 'DELETE'
        })
            .then(_ => setEditCards(!editCards))
    }

    return (
        <>
            <Header user={user} pageNav={pageNav} />
            <div className="wide-container">
                <h1 className="cards-title">My cards</h1>
                {cards.length === 0 ? <p className='no-games'>You don't have any cards.</p> :
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
                    </div>}
                <div className="card-list">
                    {
                        editCardView ?
                            <form onSubmit={handleSubmit} className="card create-my-card">
                                <i onClick={handleClick} class="fa-solid fa-circle-xmark"></i>
                                <input
                                    onChange={handleChange}
                                    className="form-input"
                                    placeholder="Image URL..."
                                    name="imgUrl"
                                    type="text"
                                    required
                                />
                                <input
                                    onChange={handleChange}
                                    className="form-input"
                                    placeholder="Word..."
                                    name="word"
                                    type="text"
                                    required
                                />
                                <input
                                    onChange={handleChange}
                                    className="form-input"
                                    placeholder="Word Type..."
                                    name="type"
                                    type="text"
                                    required
                                />
                                <button type="submit" className="create-btn">Submit Card</button>
                            </form> :
                            <div onClick={handleClick} className="card create-card">
                                <i className="fa-solid fa-circle-plus"></i>
                            </div>
                    }
                    {cards && cards.map(card => {
                        const cardWord = card.word[0].toUpperCase() + card.word.substring(1)
                        return (
                            <div key={card.id} className="card">
                                {
                                    runFunction === card.id ?
                                        <p
                                            onClick={() => handleConfirmDelete(card.id)}
                                            className="confirm-delete confirm-delete-card"
                                        >
                                            Click to Delete
                                        </p> :
                                        <i
                                            onClick={() => handleDelete(card.id)}
                                            className="fa-solid fa-trash-can delete-btn delete-card-btn">
                                        </i>
                                }
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
        </>
    )
}

export default MyCards