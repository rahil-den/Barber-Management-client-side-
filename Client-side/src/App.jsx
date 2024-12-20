import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
// import './App.css';
import GetallBarber from './components/allBarber.jsx';
// import Home from './components/Home';
// import NavBar from './components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import AddUser from './components/Adduser';
// import Edituser from './components/Edituser';
function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      {/* <NavBar/> */}
      <Routes>
       
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/getallBarber" element={<GetallBarber />} />
        {/* <Route path="/adduser" element={<AddUser />} /> */}
        {/* <Route path="/edit/:id" element={<Edituser />} /> */}
        {/* <Route path="/delete/:id"/> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
