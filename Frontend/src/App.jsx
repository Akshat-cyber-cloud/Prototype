import React from 'react'
import Navbar from './Components/Navbar'
import Hero from './Components/Hero'
import MenuShowcase from './Components/MenuShowcase'
import './index.css'

const App = () => {
  return (
    <div className="app-container">
      <div className="top-section">
        <Navbar />
        <Hero />
      </div>
      <MenuShowcase />
    </div>
  )
}

export default App