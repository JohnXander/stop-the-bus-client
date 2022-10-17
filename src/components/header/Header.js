import './style.css'

const Header = ({ user }) => {
    return (
        <div className='header'>
            <h3>Stop the Bus</h3>
            <div className='user'>
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