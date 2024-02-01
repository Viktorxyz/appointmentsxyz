import { useEffect, useRef, useState } from 'react';
import differenceInMinutes from 'date-fns/differenceInMinutes';
import { isSameDay } from 'date-fns';
import { Link } from 'react-router-dom';
import CalendarBar from '../../../components/CalendarBar'
import './style.css'
import { useAppointments } from '../../../contexts/AppointmentsProvider';

function Calendar() {
  const slots = []
  const slotsElement = useRef()
  const slotHeight = useRef()
  const today = new Date()
  const [loading, setLoading] = useState(true)
  const [appointments, fetchAppointments] = useAppointments()
  const [shownAppointments, setShownAppointments] = useState([])
  const [date, setDate] = useState(today)
  const [nowIndicator, setNowIndicator] = useState(0)

  for (let i = 1; i < 10; i++) slots.push(`0${i}:00`)
  for (let i = 10; i < 24; i++) slots.push(`${i}:00`)

  function Slot({ slot }) {
    return (
      <div className='slot'>
        <div className='slot-time'>
          <p className='unselectable'>{slot}</p>
          <p className='slot-time--content'>{slot}</p>
        </div>
        <div className='slot-area'></div>
      </div>
    )
  }

  useEffect(() => {
    slotHeight.current = slotsElement.current.scrollHeight / (1440); // there are 1440 minutes in 24 hours
    setNowIndicator(`${slotHeight.current * (today.getHours() * 60 + today.getMinutes())}px`)
    setLoading(false);
  }, [])

  useEffect(() => {
    setShownAppointments(appointments.filter(appointment => isSameDay(appointment.from, date)))
  }, [date, appointments])

  function CalendarAppointment({ appointment }) {
    const fromTime = appointment.from
    const toTime = appointment.to
    const diffTime = differenceInMinutes(toTime, fromTime);
    const from = `${slotHeight.current * (fromTime.getHours() * 60 + fromTime.getMinutes())}px`
    const to = `${slotHeight.current * diffTime}px`
    return (
      <div className='calendar-appointment' style={{ top: from }}>
        <div className='calendar-appointment-content' style={{ height: to }}>
          <div className='slot-time'>
            <p className='unselectable'>00:00</p>
          </div>
          <div className='calendar-appointment-info'>
            <p className='calendar-appointment-info__client'>Viktor Cordas</p>
            <p className='calendar-appointment-info__services'>Hair Cut, Beard Trim</p>
            <p className='calendar-appointment-info__address'>Novosadska 500</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='calendar'>
      <CalendarBar date={date} setDate={setDate} />
      <div className='slots' ref={slotsElement}>
        <span className='now-indicator' style={{ top: nowIndicator }}>
          <div className='now-indicator-content'>
            <div className='now-indicator-pin'>
              <div className='now-indicator-pin-head'></div>
              <div className='now-indicator-pin-line'></div>
            </div>
          </div>
        </span>
        {!loading && shownAppointments.map((a, i) => <CalendarAppointment key={i} appointment={a} />)}
        {slots.map((slot, i) => <Slot key={i} slot={slot} />)}
        <span className='slot'></span>
      </div>
      <Link to="appointments/new-appointment" className='new-appointment'>
        <img src="../../../plus.png" alt="" />
      </Link>
    </div>
  )
}

export default Calendar