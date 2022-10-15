import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';

const App = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch('http://localhost:4000/users')
      .then(res => res.json())
      .then(data => setUsers(data.users))
  }, [])

  return (
    <>
      <Button variant="contained">Stop the bus</Button>
      {users.map(u => <p key={u.id}>{u.username}</p>)}
    </>
  )
}

export default App
