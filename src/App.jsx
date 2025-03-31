import './App.css'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './components/Home'
import Login from './components/Login'
import ProtectedRoute from './components/protectedRoute'
import DashBoard from './components/Dashboard'
import Register from './components/Register'


function App() {
  console.log("rendered")

  return (
    <>
    <Routes>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/' element={<Layout/>}>
        <Route index element={<Home/>}></Route>
        <Route path="/dashboard" element={<ProtectedRoute />}>
            <Route index element={<DashBoard />} />
        </Route>
      </Route>
    </Routes>

    </>
  )
}

export default App
