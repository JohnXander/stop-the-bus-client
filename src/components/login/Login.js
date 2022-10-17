import { useState } from 'react'
import './style.css'

const Login = () => {
    const [formValue, setFormValue] = useState({
        username: "",
        password: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValue((prevState) => {
            return {
                ...prevState,
                [name]: value,
            };
        });
    };

    const { username, password } = formValue;

    return (
        <form onClick={handleSubmit} className="form">
            <label>Username</label>
            <input
                type="text"
                name="username"
                onChange={handleChange}
                value={username} />
            <label>Password</label>
            <input
                type="password"
                name="password"
                onChange={handleChange}
                value={password} />
            <button type='submit'>Submit</button>
        </form>
    )
}

export default Login