import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/loginPage/loginPage.tsx'
import RegisterPage from './pages/registerPage/registerPage.tsx'
import MediaPage from './pages/media/mediaPage.tsx'
import AboutUsPage from './pages/introduction/aboutUsPage.tsx'
import ContactPage from './pages/contact/contact.tsx'
import Footer from './components/footer.tsx'
import Header from './components/header.tsx'
import { GoogleOAuthProvider } from '@react-oauth/google'
import React from 'react'

function Layout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}

function App() {
  return (
    <GoogleOAuthProvider clientId='397904889849-udf1t7mvf7vmr1bvvdbmv2amj0nea404.apps.googleusercontent.com'>
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={
              <Layout>
                <div>Home Page</div>
              </Layout>
            }
          />
          <Route path='login' element={<LoginPage />} />
          <Route path='register' element={<RegisterPage />} />
          <Route
            path='/media/:tab'
            element={
              <Layout>
                <MediaPage />
              </Layout>
            }
          />
          <Route
            path='services'
            element={
              <Layout>
                <div>Services Page</div>
              </Layout>
            }
          />
          <Route
            path='services/:id'
            element={
              <Layout>
                <div>Service Details</div>
              </Layout>
            }
          />
          <Route
            path='reset-password'
            element={
              <Layout>
                <div>Reset Password Page</div>
              </Layout>
            }
          />
          <Route
            path='profile'
            element={
              <Layout>
                <div>Profile Page</div>
              </Layout>
            }
          />
          <Route
            path='intro'
            element={
              <Layout>
                <AboutUsPage />
              </Layout>
            }
          />
          <Route
            path='contact'
            element={
              <Layout>
                <ContactPage />
              </Layout>
            }
          />
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  )
}

export default App