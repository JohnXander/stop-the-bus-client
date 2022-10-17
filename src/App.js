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

const App = () => {
  return (
    <div>
      <Header />
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