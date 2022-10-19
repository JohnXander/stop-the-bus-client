import { useState } from "react"
import { useLocation } from "react-router-dom"

const CreateTeams = () => {
    const location = useLocation()
    const gameId = location.state.data.game.id
    console.log('first', gameId)

    const [formValue, setFormValue] = useState({})

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('second', formValue)
        // const { name } = formValue
        // fetch('http://localhost:4000/games', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({ name, userId: +userId }),
        // })
        //     .then(res => res.json())
        //     .then(data => navigate('/create/teams', { state: { data } }))
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValue((prevState) => {
            return {
                ...prevState,
                [name]: value,
            }
        })
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className='game-form'>
                <h3>Teams</h3>
                <div>
                    <label>Team Name</label>
                    <input name='team1' onChange={handleChange} type="text" required />
                </div>
                <div>
                    <label>Team Name</label>
                    <input name='team2' onChange={handleChange} type="text" required />
                </div>
                <button>Add another team</button>
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default CreateTeams