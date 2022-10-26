import Login from '../login/Login'
import './style.css'

const Landing = ({ setLoggedInId }) => {

    return (
        <>
            <h3 className='app-name landing-app-name'>Stop the Bus</h3>
            <div className='landing-container'>
                <div className='hero-container'>
                    <img
                        src="https://e9i3r2v2.stackpathcdn.com/wp-content/uploads/2021/08/AdobeStock_279216382-1182x665.jpeg"
                        alt=""
                    />
                </div>
                <div className='login-container'>
                    <Login setLoggedInId={setLoggedInId} />
                </div>
            </div>
        </>
    )
}

export default Landing