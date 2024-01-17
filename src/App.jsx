import { useState } from 'react'
import { Routes,Route } from 'react-router-dom'
import HomePage from './pages/home'
import RoomPage from './pages/room'
import './App.css'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/room/:roomId' element={<RoomPage/>} />
      </Routes>
    </>
  )
}

export default App
