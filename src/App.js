import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'

import Login from './components/login/Login'
import Register from './components/register/Register'
import Games from './components/games/Games'

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/games' element={<Games />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App