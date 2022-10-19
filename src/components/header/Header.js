import './style.css'

const Header = ({ user }) => {

    return (
        <div className='header'>
            <a className='app-name' href="/"><h3>Stop the Bus</h3></a>
            <div className='user'>
                <a href="/games"><button>My Games</button></a>
                <h6>{user.username}</h6>
                <img
                    className='profile-pic'
                    src={user.imgUrl}
                    alt="profile pic"
                />
            </div>
        </div>
    )
}

export default Header