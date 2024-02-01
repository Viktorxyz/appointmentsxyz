import { addDays, eachDayOfInterval, endOfMonth, format, getDate, getDay, isMonday, isSunday, isToday, startOfMonth, subDays, toDate } from 'date-fns'
import { isEqual } from 'lodash'
import './style.css'
import { forwardRef, useState } from 'react'

const CalendarMonthGrid = forwardRef(function CalendarMonthGrid({ defaultDate, onChange }, ref) {
  const [date, setDate] = useState(defaultDate || new Date())
  const start = startOfMonth(date)
  const end = endOfMonth(date)
  const weekDays = ["M", "T", "W", "T", "F", "S", "S"]
  const MondayToSunday = [6, 0, 1, 2, 3, 4, 5];
  const month = eachDayOfInterval({ start, end })
  const monthBefore = isMonday(start) ? [] :
    eachDayOfInterval({ start: subDays(start, MondayToSunday[getDay(start)]), end: subDays(start, 1) })
  const monthAfter = isSunday(end) ? [] :
    eachDayOfInterval({ start: addDays(end, 1), end: addDays(end, 6 - MondayToSunday[getDay(end)]) })

  function CalendarMonthGridCell({ monthDate }) {
    const gridColumn = MondayToSunday[getDay(monthDate)] + 1

    const onClick = () => {
      setDate(monthDate)
      onChange(monthDate)
    }

    return (
      <button
        className='calendar-month-grid-cell calendar-month-grid__date'
        data-today={isToday(monthDate)}
        data-current={isEqual(date, monthDate)}
        onClick={onClick}
        style={{ gridColumn }
        }
      >
        {format(monthDate, "d")}
      </button >
    )
  }

  return (
    <div className='calendar-month-grid' ref={ref}>
      {weekDays.map((weekDay, i) => <div key={i} className='calendar-month-grid-cell calendar-month-grid__weekday'>{weekDay}</div>)}
      {monthBefore.map((monthDate, i) => <CalendarMonthGridCell key={i} monthDate={monthDate} />)}
      {month.map((monthDate, i) => <CalendarMonthGridCell key={i} monthDate={monthDate} />)}
      {monthAfter.map((monthDate, i) => <CalendarMonthGridCell key={i} monthDate={monthDate} />)}
    </div>
  )
})

export default CalendarMonthGrid