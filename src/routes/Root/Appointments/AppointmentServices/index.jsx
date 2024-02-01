import { useNavigate } from 'react-router-dom'
import AppointmentServicesComponent from '../../../../components/AppointmentServices'
import { useAppointment } from '../../../../contexts/AppointmentProvider'
import { useState } from 'react'

function AppointmentServices() {
  const navigate = useNavigate()
  const [appointment, setAppointment] = useAppointment()
  const [services, setServices] = useState(() => {
    if (appointment.services) return [...appointment.services]
    else return []
  })

  const cancel = () => {
    navigate(-1)
  }

  const save = () => {
    setAppointment(prev => {
      prev.services = services
      return prev
    })
    navigate(-1)
  }

  return (
    <div className='container'>
      <h1>Services</h1>
      <AppointmentServicesComponent services={services} setServices={setServices} />
      <div className='buttons'>
        <button onClick={cancel}>Cancel</button>
        <button onClick={save}>Save</button>
      </div>
    </div>
  )
}

export default AppointmentServices