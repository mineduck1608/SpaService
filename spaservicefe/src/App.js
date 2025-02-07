import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/loginPage/loginPage.tsx'
import RegisterPage from './pages/registerPage/registerPage.tsx'
import MediaPage from './pages/mediaPage/mediaPage.tsx'
import AboutUsPage from './pages/introduction/aboutUsPage.tsx'
import Footer from './components/ui/footer.tsx'
import Header from './components/ui/header.tsx'
import { GoogleOAuthProvider } from '@react-oauth/google'
import React from 'react'


function App() {
  return (
    <GoogleOAuthProvider clientId='397904889849-udf1t7mvf7vmr1bvvdbmv2amj0nea404.apps.googleusercontent.com'>
      <BrowserRouter>
        <Routes>
          <Route path='/'>
            <Route index />
            <Route path='footer' element={<Footer />}/>
            <Route path='login' element={<LoginPage />} />
            <Route path='register' element={<RegisterPage />} />
            <Route path='/media/:tab' element={<MediaPage />} />
            <Route path='services' />
            <Route path='services/:id' />
            <Route path='reset-password' />
            <Route path='profile' />
            <Route path='intro' element={<AboutUsPage />} />
            <Route path='footer' element={ 
              <>
              <Footer />
              <AboutUsPage />
              </>
              }/>
            <Route path='header' element={<Header />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  )
}

export default App
