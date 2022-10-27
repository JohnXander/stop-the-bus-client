import Login from '../login/Login'
import './style.css'
import heroVideo from '../../assets/hero-video.mp4'

const Landing = ({ setLoggedInId }) => {

    return (
        <>
            <h3 className='app-name landing-app-name'>Stop the Bus</h3>
            <div className='landing-container'>
                <div className='hero-container'>
                    <video className='hero-video' src={heroVideo} controls></video>
                </div>
                <div className='login-container'>
                    <Login setLoggedInId={setLoggedInId} />
                </div>
            </div>
        </>
    )
}

export default Landing