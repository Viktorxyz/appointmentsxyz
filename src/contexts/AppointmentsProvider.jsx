import { createContext, useContext, useEffect, useState } from 'react'
import { functionsGetAppointments } from '../firebase'
import { endOfMonth, startOfMonth } from 'date-fns'
import Loading from '../components/Loading'
import { Outlet } from 'react-router-dom'

const AppointmentsContext = createContext()

export const useAppointments = () => {
  return useContext(AppointmentsContext)
}

function AppointmentsProvider() {
  const [loading, setLoading] = useState(true)
  const [appointments, setAppointments] = useState()

  const fetchAppointments = async (date = new Date()) => {
    const appointments =
      (await functionsGetAppointments({ from: startOfMonth(date), to: endOfMonth(date) })).data
        .map(appointment => {
          appointment.from = new Date(appointment.from)
          appointment.to = new Date(appointment.to)
          // appointment.date_created = new Date(appointment.date_created)
          return appointment
        })
    setAppointments(appointments)
    return appointments
  }

  useEffect(() => {
    const fetchData = async () => {
      await fetchAppointments(new Date())
      setLoading(false)
    }
    fetchData()
  }, [])

  if (loading) return <Loading />

  return (
    <AppointmentsContext.Provider value={[appointments, fetchAppointments]}>
      <Outlet />
    </AppointmentsContext.Provider>
  )
}

export default AppointmentsProvider