import './style.css'
import { useNavigate, useParams } from 'react-router-dom'
import TimePicker from '../../../components/TimePicker'
import { useNewBusiness } from '../../../contexts/NewBusinessProvider'
import { useState } from 'react';
import { cloneDeep } from 'lodash';

function NewBusinessDayBreak() {
  let isNew = false;
  const { i, dayId } = useParams()
  const navigate = useNavigate()
  const [workingHours, setWorkingHours] = useNewBusiness().workingHours;
  const [day, setDay] = useState(() => {
    const day = cloneDeep(workingHours[dayId])
    if (!day.breaks[i]) {
      day.breaks[i] = {};
      isNew = true;
    }
    return day
  })

  const save = () => {
    setWorkingHours(workingHours => {
      workingHours[dayId] = day;
      return workingHours
    })
    navigate(-1)
  }

  const cancel = () => {
    navigate(-1)
  }

  const deleteBreak = () => {
    setWorkingHours(workingHours => {
      day.breaks.splice(i, 1)
      workingHours[dayId] = day;
      return workingHours
    })
    navigate(-1)
  }

  const setFrom = (from) => {
    setDay(day => {
      day.breaks[i].from = from;
      return day;
    })
  }
  const setTo = (to) => {
    setDay(day => {
      day.breaks[i].to = to;
      return day;
    })
  }

  return (
    <div className='container break'>
      <h1>{dayId.charAt(0).toUpperCase() + dayId.slice(1)} Break</h1>
      <div className='from-to'>
        <TimePicker defaultValue={day.breaks[i]?.from || "13:00"} onChange={setFrom} />
        <TimePicker defaultValue={day.breaks[i]?.to || "14:00"} onChange={setTo} />
      </div>
      <div className='buttons list'>
        {!isNew && <button className='delete-break' onClick={deleteBreak}>Delete break</button>}
        <div className='buttons'>
          <button onClick={cancel}>Cancel</button>
          <button onClick={save}>Save</button>
        </div>
      </div>
    </div>
  )
}

export default NewBusinessDayBreak