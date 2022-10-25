import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import { useEffect, useState } from 'react'
import Login from './components/login/Login'
import Register from './components/register/Register'
import Games from './components/games/Games'
import Landing from './components/landing/Landing'
import Game from './components/game/Game'
import CreateName from './components/create/CreateName'
import CreateTeams from './components/create/CreateTeams'
import CreateCategories from './components/create/CreateCategories'
import MyCards from './components/myCards/MyCards'

const App = () => {
  const [user, setUser] = useState({})

  useEffect(() => {
    fetch('http://localhost:4000/users/1')
      .then(res => res.json())
      .then(data => setUser(data.user))
  }, [])

  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Landing user={user} />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/games' element={<Games user={user} />} />
          <Route path='/cards' element={<MyCards user={user} />} />
          <Route path='/games/:id' element={<Game user={user} />} />
          <Route path='/create/name' element={<CreateName user={user} />} />
          <Route path='/create/teams' element={<CreateTeams user={user} />} />
          <Route path='/create/categories' element={<CreateCategories user={user} />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App