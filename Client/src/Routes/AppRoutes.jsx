
import { Route, Routes } from 'react-router-dom'
import LandingPage from '../Pages/LandingPage'
import HomePage from '../Pages/Home'
import MainPage from '../Pages/MainPage'
import RegisterSection from '../Pages/RegisterQues'
import WelcomePage from '../Pages/Welcome'




const AppRoutes = () => {
  return (
    <>
    <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/isLoggin" element={<LandingPage/>} />
        <Route path="/register" element={<RegisterSection/>} />
        <Route path="/welcome" element={<WelcomePage/>} />
        <Route path="/learn" element={<MainPage/>} />
        <Route path="/practice" element={<MainPage/>} />
        <Route path="/leaderboard" element={<MainPage/>} />
        <Route path="/quests" element={<MainPage/>} />
        <Route path="/shop" element={<MainPage/>} />
        <Route path="/sounds" element={<MainPage/>} />
        <Route path="/profile" element={<MainPage/>} />
    </Routes>
    </>
  )
}

export default AppRoutes