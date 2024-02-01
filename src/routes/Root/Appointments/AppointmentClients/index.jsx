import { useNavigate } from 'react-router-dom'
import AppointmentClientsComponent from '../../../../components/AppointmentClients'
import { useAppointment } from '../../../../contexts/AppointmentProvider'
import { useState } from 'react'

function AppointmentClients() {
  const navigate = useNavigate()
  const [appointment, setAppointment] = useAppointment()
  const [clients, setClients] = useState(() => {
    if (appointment.clients) return [...appointment.clients]
    else return []
  })

  const cancel = () => {
    navigate(-1)
  }

  const save = () => {
    setAppointment(prev => {
      prev.clients = clients
      return prev
    })
    navigate(-1)
  }

  return (
    <div className='container'>
      <h1>Appointment clients</h1>
      <AppointmentClientsComponent clients={clients} setClients={setClients} />
      <div className='buttons'>
        <button onClick={cancel}>Cancel</button>
        <button onClick={save}>Save</button>
      </div>
    </div>
  )
}

export default AppointmentClients