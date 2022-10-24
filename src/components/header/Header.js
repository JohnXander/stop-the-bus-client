import { useEffect, useState } from 'react'
import './style.css'

const Header = ({ user }) => {
    const [isHovering, setIsHovering] = useState(false)
    const [totalGames, setTotalGames] = useState(0)
    const [totalCards, setTotalCards] = useState(0)

    const dateParts = String(new Date(user.createdAt)).split(' ')

    const handleMouseOver = () => setIsHovering(true)
    const handleMouseOut = () => setIsHovering(false)

    useEffect(() => {
        if (user.id !== undefined) {
            fetch(`http://localhost:4000/games?userId=${user.id}`)
                .then(res => res.json())
                .then(data => setTotalGames(data.games.length))

            fetch(`http://localhost:4000/cards?userId=${user.id}`)
                .then(res => res.json())
                .then(data => setTotalCards(data.cards.length))
        }
    }, [user.id])

    return (
        <div className='header'>
            <a className='app-name' href="/">
                <h3>Stop the Bus</h3>
            </a>
            <div className='user'>
                <div className='nav-link'>
                    <i className="fa-solid fa-chalkboard"></i>
                    <a href="/games">GAMES</a>
                </div>
                <div className='nav-link'>
                    <i className="fa-solid fa-note-sticky"></i>
                    <a href="/cards">CARDS</a>
                </div>
                <img
                    className='profile-pic'
                    src={user.imgUrl}
                    alt=""
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                />
                {
                    isHovering &&
                    <div
                        onMouseOver={handleMouseOver}
                        onMouseOut={handleMouseOut}
                        className='profile-info'
                    >
                        <h5>{user.username}</h5>
                        <p>Joined {dateParts[1]} {dateParts[3]}</p>
                        <p>Total Games: {totalGames}</p>
                        <p>Total Cards: {totalCards}</p>
                    </div>
                }
            </div>
        </div>
    )
}

export default Header