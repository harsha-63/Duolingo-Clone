import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AuthContextProvider from './Context/AuthContext.jsx'
import LessonProvider from './Context/LessonContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
     <AuthContextProvider>
      <LessonProvider>
       <App />
       </LessonProvider>
     </AuthContextProvider > 
  </BrowserRouter>
  </StrictMode>,
)
