import { Login } from './components/Login'
import { Home } from './components/Home'
import { NotFound } from './components/NotFound'
import './App.css'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { client } from './supabaseConfig/client'


function App() {
  const navigate = useNavigate()
  useEffect(() => {
    client.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate("/login")
      } else {
        navigate("/")
      }

    })
  }, [])


  return (
    <>

      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='*' element={<NotFound></NotFound>}> </Route>
      </Routes>
    </>
  )
}

export default App
