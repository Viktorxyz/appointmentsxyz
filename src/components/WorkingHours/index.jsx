import { useEffect, useState } from 'react';
import Checkbox from '../Checkbox';
import FromTo from '../FromTo';
import { Link } from 'react-router-dom';
import './style.css'

function WorkingHours({ workingHours, setWorkingHours }) {
  function DayListItem({ day }) {
    const dayProps = workingHours[day]
    const [closed, setClosed] = useState(dayProps.closed);

    const onChange = (v) => {
      setClosed(!v)
      setWorkingHours(workingHours => {
        workingHours[day].closed = !v;
        return workingHours
      })
    }

    return (
      <div className='list-item-day'>
        <Checkbox defaultChecked={!closed} label={day} onChange={onChange} />
        {closed ?
          <p>closed</p> :
          <Link to={day} className='list-item-day__link'>
            <FromTo from={dayProps.from} to={dayProps.to} />
          </Link>
        }
      </div>
    )
  }
  return (
    <div className='list-working-hours list'>
      {Object.keys(workingHours).map((key) => <DayListItem key={key} day={key} />)}
    </div>
  )
}

export default WorkingHours