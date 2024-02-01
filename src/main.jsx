import React from 'react'
import ReactDOM from 'react-dom/client'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import "normalize.css";
import "modern-css-reset";
import "./index.css";

// routes
import Root from './routes/Root'
import SignIn from './routes/SignIn'
import SignUp from './routes/SignUp'
import NewBusinessInfo from './routes/NewBusiness/Info'
import NewBusinessServices from './routes/NewBusiness/Services'
import NewBusinessService from './routes/NewBusiness/Service'
import NewBusinessWorkingHours from './routes/NewBusiness/WorkingHours'
import NewBusinessTravelFee from './routes/NewBusiness/TravelFee'
import NewBusinessDayDetails from './routes/NewBusiness/DayDetails'
import NewBusinessDayBreak from './routes/NewBusiness/DayBreak'
import Services from './routes/Root/Services'
import Service from './routes/Root/Services/Service'
import Calendar from './routes/Root/Calendar'
import Appointments from './routes/Root/Appointments'
import AppointmentDetails from './routes/Root/Appointments/AppointmentDetails'
import AppointmentClients from './routes/Root/Appointments/AppointmentClients';
import AppointmentServices from './routes/Root/Appointments/AppointmentServices';
import Clients from './routes/Root/Clients'
import Client from './routes/Root/Clients/Client'
import Settings from './routes/Root/Settings';

// layouts
import Layout from './layouts/Layout'
import Navbar from './layouts/Navbar';
import Steps from './layouts/Steps';

// contexts
import ProtectedRoutes from './contexts/ProtectedRoutes'
import NewBusinessProvider from './contexts/NewBusinessProvider'
import AuthProvider from './contexts/AuthProvider'
import ClientsProvider from './contexts/ClientsProvider'
import AppointmentsProvider from './contexts/AppointmentsProvider'
import ServicesProvider from './contexts/ServicesProvider'
import AppointmentProvider from './contexts/AppointmentProvider'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AuthProvider />}>
      <Route element={<Layout />}>
        <Route path='sign-in' element={<SignIn />} />
        <Route path='sign-up' element={<SignUp />} />
        <Route element={<ProtectedRoutes />}>
          <Route path='/' element={<Root />}>
            <Route element={<ServicesProvider />}>
              <Route element={<AppointmentsProvider />}>
                <Route element={<ClientsProvider />}>
                  <Route element={<Navbar />}>
                    <Route index element={<Calendar />} />
                    <Route path='clients' element={<Clients />} />
                    <Route path='appointments' element={<Appointments />} />
                    <Route path='services' element={<Services />} />
                    <Route path='settings' element={<Settings />} />
                  </Route>
                  <Route path='clients/:id' element={<Client />} />
                  <Route path='appointments/:id' element={<AppointmentProvider />}>
                    <Route index element={<AppointmentDetails />} />
                    <Route path='clients' element={<AppointmentClients />} />
                    <Route path='services' element={<AppointmentServices />} />
                  </Route>
                  <Route path='services/:id' element={<Service />} />
                </Route>
              </Route>
            </Route>
          </Route>
          <Route path='new-business' element={<NewBusinessProvider />}>
            <Route element={<Steps />}>
              <Route path='info' element={<NewBusinessInfo />} />
              <Route path='travel-fee' element={<NewBusinessTravelFee />} />
              <Route path='working-hours' element={<NewBusinessWorkingHours />} />
              <Route path='services' element={<NewBusinessServices />} />
            </Route>
            <Route path='working-hours/:dayId' element={<NewBusinessDayDetails />} />
            <Route path='working-hours/:dayId/breaks/:i' element={<NewBusinessDayBreak />} />
            <Route path='services/:id' element={<NewBusinessService />} />
          </Route>
          {/* <Route element={<BusinessRoutes />}>
              <Route path='clients' element={<Clients />} />
              <Route path='clients/:clientId' element={<EditClient />} />
              <Route path='employees' element={<Employees />} />
              <Route path='employees/:employeeId' element={<EditEmployee />} />
              <Route path='roles' element={<Roles />} />
              <Route path='roles/:roleId' element={<EditRole />} />
              <Route path='permissions' element={<Permissions />} />
              <Route path='services/:serviceId' element={<Service />} />
            </Route> */}
          {/* <Route path='profile' element={<Profile />} />
            <Route path='services' element={<Services />} />
            <Route path='appointments' element={<Appointments />} />
            <Route path='appointments/:appointmentId' element={<EditAppointment />} /> */}
        </Route>
      </Route>
    </ Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
