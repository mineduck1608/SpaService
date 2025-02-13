import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/loginPage/loginPage.tsx'
import RegisterPage from './pages/registerPage/registerPage.tsx'
import NewsDetail from './pages/news/newsDetail.tsx'
import MediaPage from './pages/mediaPage/mediaPage.tsx'
import AboutUsPage from './pages/introduction/aboutUsPage.tsx'
import ServicesPage from './pages/servicesPage/servicesPage.tsx'
import NewsPage from './pages/news/news.tsx'
import Footer from './components/ui/footer.tsx'
import ContactPage from './pages/contact/contact.tsx'
import Header from './components/ui/header.tsx'
import Home from './pages/home/home.tsx'
import { GoogleOAuthProvider } from '@react-oauth/google'
import React, { useEffect } from 'react'
import { findCategories } from './pages/servicesPage/servicesPage.util.ts'

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
  useEffect(() => {
    findCategories()
  }, [])
  return (
    <GoogleOAuthProvider clientId='397904889849-udf1t7mvf7vmr1bvvdbmv2amj0nea404.apps.googleusercontent.com'>
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={
              <Layout>
                <Home />
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
                <ServicesPage />
              </Layout>
            }
          />
          <Route
            path='services/:id'
            element={
              <Layout>
                <ServicesPage />
              </Layout>
            }
          />
          <Route
            path='services-detail/:id'
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
            path='about'
            element={
              <Layout>
                <AboutUsPage />
              </Layout>
            }
          />
          <Route
            path='/news/:tabs'
            element={
              <Layout>
                <NewsPage />
              </Layout>
            }
          />
          <Route
            path='/news/:tabs/:id'
            element={
              <Layout>
                <NewsDetail />
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
