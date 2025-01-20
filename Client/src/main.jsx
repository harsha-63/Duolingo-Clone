import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AuthContextProvider from './Context/AuthContext.jsx'
import LessonProvider from './Context/LessonContext.jsx'
import  UserStatisticsProvider  from './Context/StaticsticContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
     <AuthContextProvider>
      <LessonProvider>
        <UserStatisticsProvider>
       <App />
       </UserStatisticsProvider>
       </LessonProvider>
     </AuthContextProvider > 
  </BrowserRouter>
  </StrictMode>,
)
