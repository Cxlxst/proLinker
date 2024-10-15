import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react'
import './App.css'

import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Settings from './pages/Settings'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/inscription" element={<Register />} />
          <Route path="/connexion" element={<Login />} />
          <Route path="/parametres" element={<Settings />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
