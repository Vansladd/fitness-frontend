import './App.css'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './components/Home'
import Login from './components/Login'
import ProtectedRoute from './components/protectedRoute'
import DashBoard from './components/Dashboard'
import Register from './components/Register'
import Leaderboard from './components/Leaderboard'
import UserProfile from './components/UserProfile'


function App() {

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
        <Route path='/leaderboard' element={<ProtectedRoute/>}>
          <Route index element={<Leaderboard/>}/>
        </Route>
        <Route path='/profile/:id' element={<ProtectedRoute/>}>
          <Route index element={<UserProfile/>}/>
        </Route>
      </Route>
    </Routes>

    </>
  )
}

export default App
