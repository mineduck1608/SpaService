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
import AdminPage from './pages/admin/adminPage.tsx'
import CheckOutPage from './pages/checkout/checkoutPage.tsx'
import ResetPasswordPage from './pages/resetPassword/resetPasswordPage.tsx'
import { GoogleOAuthProvider } from '@react-oauth/google'
import React, { useEffect } from 'react'
import { findCategories } from './pages/servicesPage/servicesPage.util.ts'
import { Dashboard } from './pages/admin/dashboard.tsx'
import DemoPage from './pages/admin/accounts/page.tsx'
import CalendarApp from './pages/admin/appointments/page.tsx'
import CustomerPage from './pages/admin/customers/page.tsx'
import EmployeePage from './pages/admin/employees/page.tsx'
import ManagerPage from './pages/manager/managerMainPage.tsx'
import PayResultPage from './pages/payResult/payResultPage.tsx'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import RequestPage from './pages/appointment/requestPage.tsx'
import ContactAdminPage from './pages/admin/contacts/page.tsx'
import CustomerRequestPage from './pages/admin/customerRequests/page.tsx'
import { ProtectedAdmin } from './pages/admin/protectedAdmin.tsx'

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
          <Route
            path='requests'
            element={
              <Layout>
                <RequestPage />
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
            path='check-out'
            element={
              <Layout>
                <CheckOutPage />
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
          <Route
            path='pay-result'
            element={
              <Layout>
                <PayResultPage />
              </Layout>
            }
          />

          <Route
            path='admin'
            element={
              <ProtectedAdmin>
                <AdminPage />
              </ProtectedAdmin>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path='accounts' element={<DemoPage />} />
            <Route path='customers' element={<CustomerPage />} />
            <Route path='employees' element={<EmployeePage />} />
            <Route path='shifts' element={<></>} />
            <Route path='schedules' element={<div>AB</div>} />
            <Route path='customer-requests' element={<CustomerRequestPage />} />
            <Route path='appointments' element={<CalendarApp />} />
            <Route path='categories' element={<div>A</div>} />
            <Route path='employees-categories' element={<div>B</div>} />
            <Route path='services' element={<div>C</div>} />
            <Route path='applications' element={<div>D</div>} />
            <Route path='contacts' element={<ContactAdminPage />} />
            <Route path='transactions' element={<div>F</div>} />
            <Route path='commissions' element={<div>ABC</div>} />
            <Route path='employees-commissions' element={<div>BE</div>} />
            <Route path='news' element={<div>BF</div>} />
            <Route path='promotions' element={<div>CF</div>} />
          </Route>
          <Route
            path='manager'
            element={
              <ProtectedAdmin>
                <ManagerPage />
              </ProtectedAdmin>
            }
          >
            <Route index />
            <Route path='applications' />
            <Route path='requests' />
            <Route path='contacts' />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </GoogleOAuthProvider>
  )
}

export default App
