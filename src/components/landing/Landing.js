import Header from '../header/Header'
import './style.css'

const Landing = ({ user }) => {
    return (
        <>
            <Header user={user} />
            <div className='hero-container'>
                <img
                    className="hero"
                    src="https://i.natgeofe.com/n/5f35194b-af37-4f45-a14d-60925b280986/NationalGeographic_2731043_4x3.jpg"
                    alt="hero"
                />
            </div>
        </>
    )
}

export default Landing