import { useEffect, useRef, useState } from 'react'
import Input from '../Input'
import CalendarMonthGrid from '../CalendarMonthGrid'
import { formatISO } from 'date-fns'
import './style.css'

function InputDate({ defaultDate, onChange }) {
  const ref = useRef()
  const [date, setDate] = useState(defaultDate)

  const toggleDatePicker = () => {
    ref.current.dataset.state = (ref.current.dataset.state == 'inactive') ? 'active' : 'inactive'
  }

  useEffect(() => {
    ref.current.dataset.state = 'inactive'
  }, [])

  return (
    <div className='input-date'>
      <Input
        type="button"
        onClick={toggleDatePicker}
        value={date ? formatISO(date, { representation: "date" }) : "Select date"}
      />
      <CalendarMonthGrid defaultDate={date} onChange={(date) => { setDate(date); onChange(date) }} ref={ref} />
    </div>
  )
}

export default InputDate