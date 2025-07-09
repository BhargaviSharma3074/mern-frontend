import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './components/home.jsx'

function App() {

  return (
    <div className = "App-Container">
    <h1 style={{backgroundColor:"maroon", color: "white"}}>MERN Frontend</h1>
    <Home age={21} />
    <h3>This is footer</h3>
    </div>
  )
}

export default App
