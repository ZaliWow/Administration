import { Login } from './pages/Login'
import { Home } from './pages/Home'
import { NotFound } from './pages/NotFound'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { client } from './supabaseConfig/client'
import { NavbarHome } from './components/navbar'
import { CreateProduct } from './components/CreateProduct'

function App() {
  const [loged, setLoged]= useState(false)
  const navigate = useNavigate()
  useEffect(() => {
   client.auth.onAuthStateChange((event, session) => {
     if (!session) {
      setLoged(false)
       navigate("/login")
      }else{
        
        setLoged(true)
      }

    })
 }, [])


  return (
    <>
      {loged ? <NavbarHome></NavbarHome>  : ""}
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='*' element={<NotFound></NotFound>}></Route>
        <Route path='/crear/producto' element={<CreateProduct></CreateProduct>}></Route>
      </Routes>
    </>
  )
}

export default App
