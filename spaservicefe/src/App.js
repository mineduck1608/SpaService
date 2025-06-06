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
import DetailPage from './pages/serviceDetailPage/detailPage.tsx'
import AdminPage from './pages/admin/adminPage.tsx'
import CheckOutPage from './pages/checkout/checkoutPage.tsx'
import ResetPasswordPage from './pages/resetPassword/resetPasswordPage.tsx'
import { GoogleOAuthProvider } from '@react-oauth/google'
import React, { useEffect } from 'react'
import { findCategories } from './pages/servicesPage/servicesPage.util.ts'
import { Dashboard } from './pages/admin/dashboard/dashboard.tsx'
import DemoPage from './pages/admin/accounts/page.tsx'
import CalendarApp from './pages/admin/appointments/page.tsx'
import AppointmentManagePage from './pages/admin/appointments/managePage.tsx'
import CustomerPage from './pages/admin/customers/page.tsx'
import EmployeePage from './pages/admin/employees/page.tsx'
import EmployeeMainPage from './pages/admin/employee/employeeMainPage.tsx'
import ManagerPage from './pages/manager/managerMainPage.tsx'
import PayResultPage from './pages/payResult/payResultPage.tsx'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import RequestPage from './pages/requestPage/requestPage.tsx'
import AppointmentPage from './pages/appointmentPage/appointmentPage.tsx'
import ContactAdminPage from './pages/admin/contacts/page.tsx'
import CustomerRequestPage from './pages/admin/customerRequests/page.tsx'
import CosmeticCheckoutPage from './pages/checkoutForCosmetic/orderCheckoutPage.tsx'
import { ProtectedAdmin } from './pages/admin/protectedAdmin.tsx'
import AdminNewsPage from './pages/admin/news/page.tsx'
import CosmeticCategoriesPage from './pages/admin/cosmeticcategories/page.tsx'
import SpaServicePage from './pages/admin/services/page.tsx'
import TransactionPage from './pages/admin/transactions/page.tsx'
import PromotionPage from './pages/admin/promotions/page.tsx'
import CosmeticPage from './pages/cosmeticPage/cosmeticPage.tsx'
import ApplicationPage from './pages/admin/applications/page.tsx'
import CosmeticDetailPage from './pages/cosmeticDetailPage/cosmeticDetailPage.tsx'
import OrderPage from './pages/admin/orders/page.tsx'
import AdminFloorPage from './pages/admin/floors/page.tsx'
import AdminRoomPage from './pages/admin/rooms/page.tsx'
import ServiceCategoriesPage from './pages/admin/servicecategories/page.tsx'
import AdminCosmeticPage from './pages/admin/products/page.tsx'
import AdminFeedbackPage from './pages/admin/feedbacks/page.tsx'
import AdminEmployeeCategoryPage from './pages/admin/employeeCategories/page.tsx'
import CartPage from './pages/cart/cartPage.tsx'
import ImageUpload from './components/imageUpload.tsx'
import AdminManagerPage from './pages/admin/managers/page.tsx'
import UserProfile from './pages/profile/profile.tsx'
import RecruitmentPage from './pages/recruitment/page.tsx'
import { ProtectedManager } from './pages/admin/protectedManager.tsx'
import { ProtectedEmployee } from './pages/admin/protectedEmployee.tsx'
import EmployeeApplicationPage from './pages/employee/application/page.tsx'
import CustomerApplicationPage from './pages/application/customerApplicationPage.tsx'
import EmployeeAppointmentManagePage from './pages/admin/employee/appointments/managePage.tsx'
import EmployeeCalendarApp from './pages/admin/employee/appointments/page.tsx'
import ApplicationList from './pages/applicationList/applicationList.tsx'
import EmployeeCommissionPage from './pages/admin/employee/commission/commissionPage.tsx'
import CheckInPage from './pages/admin/checkIn/page.tsx'
import ReportPage from './pages/admin/report/ReportPage.tsx'
import CustomerTransPage from './pages/customerTransactionPage/customerTransPage.tsx'
import CustomerOrderPage from './pages/customer/customerOrderPage/orderPage.tsx'
import CalculateDatePage from './pages/test/page.tsx'
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
          <Route path='/calculateDate' element={<CalculateDatePage />} />
          <Route
            path='requests'
            element={
              <Layout>
                <RequestPage />
              </Layout>
            }
          />
          <Route
            path='recruitment'
            element={
              <Layout>
                <RecruitmentPage />
              </Layout>
            }
          />
          <Route
            path='profile'
            element={
              <Layout>
                <UserProfile />
              </Layout>
            }
          />
          <Route path='upload' element={<ImageUpload />} />
          <Route
            path='appointments'
            element={
              <Layout>
                <AppointmentPage />
              </Layout>
            }
          />
          <Route
            path='orders'
            element={
              <Layout>
                <CustomerOrderPage />
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
            path='cosmetics'
            element={
              <Layout>
                <CosmeticPage />
              </Layout>
            }
          />
          <Route
            path='carts'
            element={
              <Layout>
                <CartPage />
              </Layout>
            }
          />
          <Route
            path='transactions'
            element={
              <Layout>
                <CustomerTransPage />
              </Layout>
            }
          />
          <Route
            path='cosmetics/:id'
            element={
              <Layout>
                <CosmeticPage />
              </Layout>
            }
          />
          <Route
            path='cosmetics-detail/:id'
            element={
              <Layout>
                <CosmeticDetailPage />
              </Layout>
            }
          />
          <Route
            path='cosmetics-check-out'
            element={
              <Layout>
                <CosmeticCheckoutPage />
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
            path='create-application'
            element={
              <Layout>
                <CustomerApplicationPage />
              </Layout>
            }
          />
          <Route
            path='transaction-list'
            element={
              <Layout>
                <CustomerTransPage />
              </Layout>
            }
          />
          <Route
            path='application'
            element={
              <Layout>
                <ApplicationList />
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
            <Route path='' index element={<Dashboard />} />

            {/* Workspaces */}
            <Route path='appointments-schedule' element={<CalendarApp />} />
            <Route path='appointments-manage' element={<AppointmentManagePage />} />
            <Route path='orders' element={<OrderPage />} />
            <Route path='transactions' element={<TransactionPage />} />

            {/* Requests */}
            <Route path='customer-requests' element={<CustomerRequestPage />} />
            <Route path='applications' element={<ApplicationPage />} />
            <Route path='guest-contacts' element={<ContactAdminPage />} />

            {/* Facilities */}
            <Route path='floors' element={<AdminFloorPage />} />
            <Route path='rooms' element={<AdminRoomPage />} />

            {/* Others */}
            <Route path='promotions' element={<PromotionPage />} />
            <Route path='news' element={<AdminNewsPage />} />
            <Route path='feedbacks' element={<AdminFeedbackPage />} />

            {/* Users */}
            <Route path='accounts' element={<DemoPage />} />
            <Route path='employee-categories' element={<AdminEmployeeCategoryPage />} />

            {/* Users Management */}
            <Route path='managers' element={<AdminManagerPage />} />
            <Route path='customers' element={<CustomerPage />} />
            <Route path='employees' element={<EmployeePage />} />

            {/* Spa Services */}
            <Route path='service-categories' element={<ServiceCategoriesPage />} />
            <Route path='spa-services' element={<SpaServicePage />} />

            {/* Cosmetics */}
            <Route path='cosmetic-categories' element={<CosmeticCategoriesPage />} />
            <Route path='cosmetic-product' element={<AdminCosmeticPage />} />
            <Route path='report' element={<ReportPage />} />
          </Route>

          <Route
            path='manager'
            element={
              <ProtectedManager>
                <ManagerPage />
              </ProtectedManager>
            }
          >
            <Route index element={<Dashboard />} />

            {/* Workspaces */}
            <Route path='appointments-schedule' element={<CalendarApp />} />
            <Route path='appointments-manage' element={<AppointmentManagePage />} />
            <Route path='orders' element={<OrderPage />} />
            <Route path='transactions' element={<TransactionPage />} />

            {/* Requests */}
            <Route path='customer-requests' element={<CustomerRequestPage />} />
            <Route path='applications' element={<ApplicationPage />} />
            <Route path='guest-contacts' element={<ContactAdminPage />} />

            {/* Facilities */}
            <Route path='floors' element={<AdminFloorPage />} />
            <Route path='rooms' element={<AdminRoomPage />} />

            {/* Others */}
            <Route path='promotions' element={<PromotionPage />} />
            <Route path='news' element={<AdminNewsPage />} />
            <Route path='feedbacks' element={<AdminFeedbackPage />} />

            {/* Users */}
            <Route path='employee-categories' element={<AdminEmployeeCategoryPage />} />
            <Route path='employees' element={<EmployeePage />} />

            {/* Spa Services */}
            <Route path='service-categories' element={<ServiceCategoriesPage />} />
            <Route path='spa-services' element={<SpaServicePage />} />

            {/* Cosmetics */}
            <Route path='cosmetic-categories' element={<CosmeticCategoriesPage />} />
            <Route path='cosmetic-product' element={<AdminCosmeticPage />} />
            <Route path='applications' />
            <Route path='requests' />
            <Route path='contacts' />
          </Route>

          <Route
            path='employee'
            element={
              <ProtectedEmployee>
                <EmployeeMainPage />
              </ProtectedEmployee>
            }
          >
            {/* <Route index element={<Dashboard />} /> */}
            <Route index element={<CheckInPage />} />
            <Route path='application' element={<EmployeeApplicationPage />} />

            {/* Workspaces */}
            <Route path='appointments-schedule' element={<EmployeeCalendarApp />} />
            <Route path='appointments-manage' element={<EmployeeAppointmentManagePage />} />
            {/* <Route path='transactions' element={<TransactionPage />} /> */}
            <Route path='commissions' element={<EmployeeCommissionPage />} />
            <Route path='check-in' element={<CheckInPage />} />

            {/* Requests */}
            {/* <Route path='customer-requests' element={<CustomerRequestPage />} />
            <Route path='applications' element={<ApplicationPage />} />
            <Route path='guest-contacts' element={<ContactAdminPage />} /> */}

            {/* Facilities */}
            {/* <Route path='floors' element={<AdminFloorPage />} />
            <Route path='rooms' element={<AdminRoomPage />} /> */}

            {/* Others */}
            {/* <Route path='promotions' element={<PromotionPage />} />
            <Route path='news' element={<AdminNewsPage />} /> */}
            {/* <Route path='feedbacks' element={<FeedbackPage />} /> */}

            {/* Spa Services */}
            {/* <Route path='service-categories' element={<ServiceCategoriesPage />} />
            <Route path='spa-services' element={<SpaServicePage />} /> */}

            {/* Cosmetics */}
            {/* <Route path='cosmetic-categories' element={<CosmeticCategoriesPage />} />
            <Route path='cosmetic-product' element={<AdminCosmeticPage />} />
            <Route path='applications' />
            <Route path='requests' />
            <Route path='contacts' /> */}
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer containerId={'toast'} />
    </GoogleOAuthProvider>
  )
}

export default App
