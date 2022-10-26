import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './style.css'

const Header = ({ user, pageNav }) => {
    const [isHovering, setIsHovering] = useState(false)
    const [totalGames, setTotalGames] = useState(0)
    const [totalCards, setTotalCards] = useState(0)
    const navigate = useNavigate()

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

    const handleNavigate = (path) => navigate(path, { state: path.substring(1) })

    return (
        <div className='header'>
            <h3 className='app-name'>
                Stop the Bus
            </h3>
            <div className='user'>
                <div className='nav-link' style={pageNav === 'cards' ? { color: '#d5d5d5' } : { color: '#737373' }}>
                    <i className="fa-solid fa-chalkboard"></i>
                    <p onClick={() => handleNavigate('/games')}>GAMES</p>
                </div>
                <div className='nav-link' style={pageNav === 'cards' ? { color: '#737373' } : { color: '#d5d5d5' }}>
                    <i className="fa-solid fa-note-sticky"></i>
                    <p onClick={() => handleNavigate('/cards')}>CARDS</p>
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
                        <p
                            onClick={() => handleNavigate('/')}
                            className='sign-out-btn'
                        >
                            Sign Out
                        </p>
                    </div>
                }
            </div>
        </div>
    )
}

export default Header