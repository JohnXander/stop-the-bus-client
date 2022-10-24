import { useState } from 'react'
import './style.css'

const Header = ({ user }) => {
    const [isHovering, setIsHovering] = useState(false)

    const handleMouseOver = () => setIsHovering(true)
    const handleMouseOut = () => setIsHovering(false)

    return (
        <div className='header'>
            <a className='app-name' href="/">
                <h3>Stop the Bus</h3>
            </a>
            <div className='user'>
                <div className='nav-link'>
                    <i class="fa-solid fa-chalkboard"></i>
                    <a href="/games">GAMES</a>
                </div>
                <div className='nav-link'>
                    <i class="fa-solid fa-note-sticky"></i>
                    <a href="/cards">CARDS</a>
                </div>
                <img
                    className='profile-pic'
                    src={user.imgUrl}
                    alt="profile pic"
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
                        <p>Total Games:</p>
                    </div>
                }
            </div>
        </div>
    )
}

export default Header