
import { Route, Routes } from 'react-router-dom'
import LandingPage from '../Pages/LandingPage'
import HomePage from '../Pages/Home'



const AppRoutes = () => {
  return (
    <>
    <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/isLoggin" element={<LandingPage/>} />
    </Routes>
    </>
  )
}

export default AppRoutes