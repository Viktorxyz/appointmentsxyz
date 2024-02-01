import { useEffect, useRef } from 'react'
import Input from '../Input'
import TimePicker from '../TimePicker'
import './style.css'

function InputTime({ onChange, defaultTime }) {
  const ref = useRef()

  const toggleTimePicker = () => {
    ref.current.dataset.status = ref.current.dataset.status == 'inactive' ? 'active' : 'inactive'
  }

  useEffect(() => {
    ref.current.dataset.status = 'inactive'
  }, [])

  return (
    <div className='input-time'>
      <Input type="button" defaultValue={defaultTime} onClick={toggleTimePicker} />
      <TimePicker defaultTime={defaultTime} onChange={onChange} ref={ref} />
    </div>
  )
}

export default InputTime