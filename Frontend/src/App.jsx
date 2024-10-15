import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react'
import './App.css'

import Register from './pages/Register'
import Login from './pages/Login'
import Test from './pages/test';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/test" element={<Test />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
