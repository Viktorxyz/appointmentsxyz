import { useNavigate, useParams } from 'react-router-dom'
import { useNewBusiness } from '../../../contexts/NewBusinessProvider'
import DayDetails from '../../../components/DayDetails'
import { useState } from 'react'
import './style.css'
import { cloneDeep } from 'lodash'

function NewBusinessDayDetails() {
  const { dayId } = useParams()
  const navigate = useNavigate()
  const context = useNewBusiness()
  const [workingHours, setWorkingHours] = context.workingHours
  const [day, setDay] = useState(cloneDeep(workingHours[dayId]))

  const cancel = () => {
    navigate(-1)
  }

  const save = () => {
    setWorkingHours(workingHours => {
      workingHours[dayId] = day
      return workingHours
    })
    navigate(-1)
  }

  return (
    <div className='new-business-day-details container'>
      <h1>{dayId.charAt(0).toUpperCase() + dayId.slice(1)}</h1>
      <DayDetails day={day} setDay={setDay} />
      <div className='buttons'>
        <button onClick={cancel}>Cancel</button>
        <button onClick={save}>Save</button>
      </div>
    </div>
  )
}

export default NewBusinessDayDetails