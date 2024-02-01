import DayBreaks from '../DayBreaks'
import TimePicker from '../TimePicker'
import './style.css'

function DayDetails({ day, setDay }) {
  return (
    <div className='day-details'>
      <h2>Open</h2>
      <div className='day-from-to'>
        <TimePicker defaultValue={day.from} onChange={(from) => { setDay(day => Object.assign(day, { from })) }} />
        <TimePicker defaultValue={day.to} onChange={(to) => { setDay(day => Object.assign(day, { to })) }} />
      </div>
      <h2>Breaks</h2>
      <DayBreaks breaks={day.breaks} />
    </div>
  )
}

export default DayDetails