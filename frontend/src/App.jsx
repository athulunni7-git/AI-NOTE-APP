import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Register from './Components/Register'
import Login from './Components/Login'
import Navbar from './Components/Navbar'

import {BrowserRouter,Routes,Route} from "react-router-dom";
import Home from './Components/Home'
import AddNote from './Components/AddNote'
import Notelist from './Components/Notelist'
import NoteDetail from './Components/NoteDetail'
import EditNote from './Components/EditNote'

function App() {

  const [islogin, setlogin] = useState(false)

  function CheckloginStatus(){
    let t = localStorage.getItem('Access')

    if (t){
      setlogin(true)}
    else{
      setlogin(false)
    }
    }
  
    useEffect(()=>{CheckloginStatus()},[])
  

  return (
    <>
    <BrowserRouter>
    <Navbar islogin={islogin} setIslogin={setlogin}/>
    <Routes>
      {/* <Route path='/' element={<Home/>} ></Route> */}
      <Route path = "register" element={<Register/>}></Route>
      <Route path = "login" element={<Login setIslogin={setlogin} />}></Route>
      <Route path="addnote" element={<AddNote/>}></Route>
      <Route path='/' element={<Notelist/>}></Route>
      <Route path='notedetails' element={<NoteDetail/>}></Route>
      <Route path='updatenote/:id' element={<EditNote/>}></Route>

    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
