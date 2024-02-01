import { useNavigate, useParams } from 'react-router-dom';
import AppointmentDetailsComponent from '../../../../components/AppointmentDetails'
import { useAppointment } from '../../../../contexts/AppointmentProvider'
import { functionsCreateAppointment, functionsUpdateAppointment } from '../../../../firebase.js';
import { formatISO } from 'date-fns';

const NEW_APPOINTMENT = 'new-appointment'

function AppointmentDetails() {
  const { id } = useParams()
  const isNew = id === NEW_APPOINTMENT ? true : false;
  const navigate = useNavigate()
  const [appointment, setAppointment] = useAppointment()

  const cancel = () => {
    navigate(-1)
  }
  const save = async () => {
    console.log(appointment);
    console.log(formatISO(appointment.date, { representation: 'date' }) + "T" + appointment.from);
    if (isNew) await functionsCreateAppointment({
      ...appointment,
      from: new Date(formatISO(appointment.date, { representation: 'date' }) + "T" + appointment.from),
      to: new Date(formatISO(appointment.date, { representation: 'date' }) + "T" + appointment.to)
    });
    else await functionsUpdateAppointment({
      ...appointment,
      from: new Date(formatISO(appointment.date, { representation: 'date' }) + "T" + appointment.from),
      to: new Date(formatISO(appointment.date, { representation: 'date' }) + "T" + appointment.to)
    })
    await fetchAppointments()
    navigate(-1)
  }

  return (
    <div className='appointment container'>
      <h2>{isNew ? "New appointment" : "Edit appointment"}</h2>
      <AppointmentDetailsComponent appointment={appointment} setAppointment={setAppointment} />
      <div className='buttons'>
        <button onClick={cancel}>Cancel</button>
        <button onClick={save}>Save</button>
      </div>
    </div>
  )
}

export default AppointmentDetails