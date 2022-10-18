import './style.css'

const Create = () => {
    return (
        <div>
            <form className='game-form'>
                <h3>Create New Game</h3>
                <label>Game Name</label>
                <input type="text" />
                <h3>Teams</h3>
                <label>Team Name</label>
                <input type="text" />
                <label>Team Name</label>
                <input type="text" />
                <h3>Categories</h3>
                <label>Category 1</label>
                <input type="text" />
                <label>Category 2</label>
                <input type="text" />
                <label>Category 3</label>
                <input type="text" />
            </form>
        </div>
    )
}

export default Create