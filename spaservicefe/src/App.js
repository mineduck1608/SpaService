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
import AboutSection from './pages/home/aboutUs.tsx'
import Services from './pages/home/services.tsx'
import Products from './pages/home/products.tsx'
import News from './pages/home/news.tsx'
import OurServices from './pages/home/ourServices.tsx'
import DetailPage from './pages/detailPage/detailPage.tsx'
import DashboardPage from './pages/admin/dashboardPage.tsx'
import ResetPasswordPage from './pages/resetPassword/resetPasswordPage.tsx'
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
                <AboutSection />
                <Services />
                <OurServices />
                <Products />
                <News />
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
                <DetailPage />
              </Layout>
            }
          />
          <Route
            path='reset-password'
            element={
              <Layout>
                <ResetPasswordPage />
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
          <Route path='admin' element={<DashboardPage />} />
          <Route path='admin/accounts' element={<div>ABC</div>} />
          <Route path='admin/customers' element={<div>ABC</div>} />
          <Route path='admin/memberships' element={<div>ABC</div>} />
          <Route path='admin/employees' element={<div>ABC</div>} />
          <Route path='admin/shifts' element={<div>ABC</div>} />
          <Route path='admin/schedules' element={<div>ABC</div>} />
          <Route path='admin/requests' element={<div>ABC</div>} />
          <Route path='admin/appointments' element={<div>ABC</div>} />
          <Route path='admin/categories' element={<div>ABC</div>} />
          <Route path='admin/employees-categories' element={<div>ABC</div>} />
          <Route path='admin/services' element={<div>ABC</div>} />
          <Route path='admin/applications' element={<div>ABC</div>} />
          <Route path='admin/contacts' element={<div>ABC</div>} />
          <Route path='admin/transactions' element={<div>ABC</div>} />
          <Route path='admin/commissions' element={<div>ABC</div>} />
          <Route path='admin/employees-commissions' element={<div>ABC</div>} />
          <Route path='admin/news' element={<div>ABC</div>} />
          <Route path='admin/promotions' element={<div>ABC</div>} />
        </Routes>
        
      </BrowserRouter>
    </GoogleOAuthProvider>
  )
}

export default App
