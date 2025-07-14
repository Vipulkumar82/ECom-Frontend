import { Route, Routes } from 'react-router-dom'
import { AuthProvider } from './Auth';
import './App.css'
import Navbar from './componants/Navbar'
import Home from './pages/Home'
import About from './pages/About'
import Cart from './pages/Cart'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Register from './pages/Register'
import VerifyUser from './pages/VerifyUser'

function App() {
  return (
    <AuthProvider>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/about' element={<About/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/verify-user/:token' element={<VerifyUser/>}/>
      </Routes>
    </AuthProvider>
  )
}

export default App
