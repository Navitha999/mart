import LoginPage from './components/LoginPage'
import Home from './components/Home'
import Cart from './components/Cart'
import Payment from './components/Payment'
import {  Route, Routes } from 'react-router'

import './App.css'

function App() {

  return (

    <>
    <Routes>
    <Route path="/login" element={<LoginPage/>}/>
    <Route path="/" element={<Home/>}/>
    <Route path="/cart" element={<Cart/>}/>
    <Route path="/payment" element={<Payment/>}/>
    </Routes>
    </>
  )
}

export default App
