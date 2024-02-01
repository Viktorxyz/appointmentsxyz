import { useNavigate, useOutletContext, useParams } from 'react-router-dom'
import TimePicker from '../../components/TimePicker'
import FromTo from '../../components/FromTo'
import AddListItem from '../../components/AddListItem'

function EditDay() {
  const outletContext = useOutletContext()
  const navigate = useNavigate()
  const { day } = useParams()
  const [workingHours, setWorkingHours] = outletContext.workingHours

  const setFrom = (from) => {
    setWorkingHours(workingHours => {
      workingHours[day].from = from
      return workingHours
    })
  }
  const setTo = (to) => {
    setWorkingHours(workingHours => {
      workingHours[day].to = to
      return workingHours
    })
  }

  const deleteBreak = (i) => {
    const temp = { ...workingHours }
    temp[day].breaks.splice(i, 1)
    setWorkingHours(temp)
  }

  const addBreak = () => {
    navigate('new-break')
  }

  function Break({ i, from, to }) {
    return (
      <div className='list-item'>
        <FromTo from={from} to={to} />
        <input type="image" src="../../x.png" onClick={() => { deleteBreak(i) }} />
      </div>
    )
  }

  const cancel = () => {
    navigate('..', { relative: 'path' })
  }
  const save = () => {
    navigate('..', { relative: 'path' })
  }

  return (
    <div className='container'>
      <h1>
        {day.charAt(0).toUpperCase() + day.slice(1)}
      </h1>
      <div className='from-to-picker'>
        <TimePicker defaultTime={workingHours[day].from} onChange={setFrom} />
        <TimePicker defaultTime={workingHours[day].to} onChange={setTo} />
      </div>
      <div className='list'>
        <h1>Breaks</h1>
        {workingHours[day].breaks.map((b, i) => <Break key={i} i={i} from={b.from} to={b.to} />)}
        <div className='list-item'>
          <AddListItem onClick={addBreak} label={"Add Break"} />
        </div>
      </div>
      <div className='buttons'>
        <button onClick={cancel}>Cancel</button>
        <button onClick={save}>Save</button>
      </div>
    </div>
  )
}

export default EditDay