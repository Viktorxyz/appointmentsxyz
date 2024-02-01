import { format } from 'date-fns'
import CalendarMonthGrid from '../CalendarMonthGrid'
import './style.css'
import { useRef } from 'react'

function CalendarBar({ date, setDate }) {
  const calendarMonthGrid = useRef()

  const showCalendarMonthGrid = () => {
    calendarMonthGrid.current.dataset.active = (calendarMonthGrid.current.dataset.active == 'true') ? false : true;
  }

  return (
    <div className='calendar-bar'>
      <div className='calendar-bar__header'>
        <h3>{format(date, "MMMM d")}</h3>
        <input type="image" src="../../../down-arrow.png" onClick={showCalendarMonthGrid} />
      </div>
      <div className='calendar-bar__calendar-month-grid' data-active={false} ref={calendarMonthGrid}>
        <CalendarMonthGrid defaultDate={date} onChange={setDate} />
      </div>
    </div >
  )
}

export default CalendarBar