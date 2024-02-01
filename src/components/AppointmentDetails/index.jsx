import './style.css'
import Input from '../Input'
import InputDate from '../InputDate'
import { Link } from 'react-router-dom'
import ClientListItem from '../Clients/ClientListItem'
import ServiceListItem from '../Services/ServiceListItem'
import { useClients } from '../../contexts/ClientsProvider'
import { useServices } from '../../contexts/ServicesProvider'
import TimePicker from '../TimePicker'

function AppointmentDetails({ appointment, setAppointment }) {
  const [clients,] = useClients()
  const [services,] = useServices()

  return (
    <div className='appointment-details'>
      <div className='inputs'>
        <div className='list'>
          {appointment?.clients?.map((clientId, i) => <ClientListItem key={i} client={clients.find(c => c.id === clientId)} />)}
          <Link to="clients">Add client</Link>
        </div>
        <div className='list'>
          {appointment?.services?.map((serviceId, i) => <ServiceListItem key={i} service={services.find(s => s.id === serviceId)} />)}
          <Link to="services">Add service</Link>
        </div>
        <Input onChange={(location) => setAppointment(a => Object.assign(a, { location }))} type="text" placeholder="location" className="input-text" defaultValue={appointment?.location} />
        <div className='date-and-time'>
          <InputDate onChange={(date) => { setAppointment(a => Object.assign(a, { date })) }} defaultDate={appointment?.date} />
          <div className='time'>
            <TimePicker onChange={(from) => { setAppointment(a => Object.assign(a, { from })) }} defaultValue={appointment?.from} />
            <TimePicker onChange={(to) => { setAppointment(a => Object.assign(a, { to })) }} defaultValue={appointment?.to} />
          </div>
          {/* <InputTime onChange={setFrom} defaultTime={from} />
          <InputTime onChange={setTo} defaultTime={to} /> */}
        </div>
        <Input onChange={(notes) => { setAppointment(a => Object.assign(a, { notes })) }} type="text" placeholder="notes" className="input-text" defaultValue={appointment?.notes} />
      </div>
    </div>
  )
}

export default AppointmentDetails