import { Outlet, useParams } from 'react-router-dom'
import { createContext, useContext, useState } from 'react'
import { useAppointments } from './AppointmentsProvider'

const AppointmentContext = createContext()

export const useAppointment = () => {
  return useContext(AppointmentContext)
}

const NEW_APPOINTMENT = 'new-appointment'

function AppointmentProvider() {
  const { id } = useParams()
  const [appointments,] = useAppointments()
  const [appointment, setAppointment] = useState(() => {
    if (id === NEW_APPOINTMENT) return {}
    return { ...appointments.find(app => app.id) }
  })

  return (
    <AppointmentContext.Provider value={[appointment, setAppointment]}>
      <Outlet />
    </AppointmentContext.Provider>
  )
}

export default AppointmentProvider