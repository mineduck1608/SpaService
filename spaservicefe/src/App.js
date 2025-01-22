import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/loginPage/loginPage.tsx'
import RegisterPage from './pages/registerPage/registerPage.tsx'
import AboutUsPage from './pages/introduction/aboutUsPage.tsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'>
          <Route index />
          <Route path='login' element={<LoginPage />} />
          <Route path='register' element={<RegisterPage />} />
          <Route path='services' />
          <Route path='services/:id' />
          <Route path='reset-password' />
          <Route path='profile' />
          <Route path='intro' element={<AboutUsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
