import { useNavigate, useOutletContext, useParams } from 'react-router-dom'
import TimePicker from '../../components/TimePicker'

function Break() {
  const { day } = useParams()
  const navigate = useNavigate()
  const outletContext = useOutletContext()
  const [workingHours, setWorkingHours] = outletContext.workingHours
  const newBreak = { from: "13:30", to: "14:30" }

  const setFrom = (from) => {
    newBreak.from = from
  }
  const setTo = (to) => {
    newBreak.to = to;
  }

  const cancel = () => {
    navigate('..', { relative: 'path' })
  }

  const addBreak = () => {
    const temp = { ...workingHours }
    temp[day].breaks.push(newBreak)
    setWorkingHours(temp)
    navigate('..', { relative: 'path' })
  }

  return (
    <div>
      <h1>
        New Break
      </h1>
      <div className='from-to-picker'>
        <TimePicker defaultTime={newBreak.from} onChange={setFrom} />
        <TimePicker defaultTime={newBreak.to} onChange={setTo} />
      </div>
      <div className='buttons'>
        <button onClick={cancel}>Cancel</button>
        <button onClick={addBreak}>Add</button>
      </div>
    </div>
  )
}

export default Break