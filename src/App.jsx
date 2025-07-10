import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Register from './components/Register'
// import Home from './components/home.jsx'

function App() {

  return (
    <div className = "App-Container">
    <h1 style={{backgroundColor:"maroon", color: "white", textAlign: "center"}}>MERN Frontend</h1>
    {/* <Home age={21} /> */}
    <Register />
    <footer>
      This is footer
    </footer>
    </div>

  )
}

export default App
