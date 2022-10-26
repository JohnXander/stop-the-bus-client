import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import { useEffect, useState } from 'react'
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
  const [loggedInId, setLoggedInId] = useState(undefined)

  useEffect(() => {
    if (loggedInId !== undefined) {
      fetch(`http://localhost:4000/users/${loggedInId}`)
        .then(res => res.json())
        .then(data => setUser(data.user))
    }
  }, [loggedInId])

  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Landing setLoggedInId={setLoggedInId} />} />
          <Route path='/register' element={<Register setLoggedInId={setLoggedInId} />} />
          {loggedInId && <Route path='/games' element={<Games user={user} />} />}
          {loggedInId && <Route path='/cards' element={<MyCards user={user} />} />}
          {loggedInId && <Route path='/games/:id' element={<Game user={user} />} />}
          {loggedInId && <Route path='/create/name' element={<CreateName user={user} />} />}
          {loggedInId && <Route path='/create/teams' element={<CreateTeams user={user} />} />}
          {loggedInId && <Route path='/create/categories' element={<CreateCategories user={user} />} />}
        </Routes>
      </Router>
    </div>
  )
}

export default App