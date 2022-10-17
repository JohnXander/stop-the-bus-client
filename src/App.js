import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'

import Login from './components/login/Login'
import Register from './components/register/Register'
import Games from './components/games/Games'
import Header from './components/header/Header'
import Landing from './components/landing/Landing'
import { useEffect, useState } from 'react'

const App = () => {
  const [user, setUser] = useState({})

  useEffect(() => {
    fetch('http://localhost:4000/users/1')
      .then(res => res.json())
      .then(data => setUser(data.user))
  }, [])

  return (
    <div>
      <Header user={user} />
      <Router>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/games' element={<Games />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App